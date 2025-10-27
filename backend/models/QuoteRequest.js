const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const QuoteRequest = sequelize.define('QuoteRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quote_number: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: /^[\+]?[1-9][\d]{0,15}$/
    }
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  product_type: {
    type: DataTypes.ENUM('transformers', 'servo-stabilizers', 'wires-cables', 'other'),
    allowNull: false
  },
  specifications: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quantity: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  budget_range: {
    type: DataTypes.ENUM('under-1-lakh', '1-5-lakh', '5-25-lakh', '25-lakh-plus', 'not-specified'),
    allowNull: true
  },
  timeline: {
    type: DataTypes.ENUM('immediate', '1-month', '3-months', '6-months', 'flexible'),
    allowNull: true
  },
  additional_requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('new', 'under_review', 'quoted', 'negotiating', 'accepted', 'rejected', 'expired'),
    defaultValue: 'new'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  assigned_to: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  quoted_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  quote_valid_until: {
    type: DataTypes.DATE,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING(50),
    defaultValue: 'website'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quoted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  accepted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'quote_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (quoteRequest) => {
      // Generate quote number
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      quoteRequest.quote_number = `GE${year}${month}${day}${random}`;
    }
  },
  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['product_type']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['quote_number'],
      unique: true
    }
  ]
});

// Instance methods
QuoteRequest.prototype.markAsQuoted = function(amount, validUntil) {
  this.status = 'quoted';
  this.quoted_amount = amount;
  this.quote_valid_until = validUntil;
  this.quoted_at = new Date();
  return this.save();
};

QuoteRequest.prototype.markAsAccepted = function() {
  this.status = 'accepted';
  this.accepted_at = new Date();
  return this.save();
};

QuoteRequest.prototype.assignTo = function(assignee) {
  this.assigned_to = assignee;
  this.status = 'under_review';
  return this.save();
};

QuoteRequest.prototype.addNote = function(note) {
  const currentNotes = this.notes || '';
  const timestamp = new Date().toISOString();
  const newNote = `[${timestamp}] ${note}`;
  
  this.notes = currentNotes ? `${currentNotes}\n${newNote}` : newNote;
  return this.save();
};

// Class methods
QuoteRequest.getByStatus = function(status) {
  return this.findAll({
    where: { status },
    order: [['created_at', 'DESC']]
  });
};

QuoteRequest.getByProductType = function(productType) {
  return this.findAll({
    where: { product_type: productType },
    order: [['created_at', 'DESC']]
  });
};

QuoteRequest.getRecent = function(limit = 10) {
  return this.findAll({
    order: [['created_at', 'DESC']],
    limit
  });
};

QuoteRequest.searchByQuoteNumber = function(quoteNumber) {
  return this.findOne({
    where: { quote_number: quoteNumber }
  });
};

QuoteRequest.getExpiredQuotes = function() {
  return this.findAll({
    where: {
      status: 'quoted',
      quote_valid_until: {
        [sequelize.Sequelize.Op.lt]: new Date()
      }
    }
  });
};

module.exports = QuoteRequest;
