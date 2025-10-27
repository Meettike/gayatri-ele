const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    allowNull: true,
    validate: {
      is: /^[\+]?[1-9][\d]{0,15}$/
    }
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200]
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 100]
    }
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'resolved', 'closed'),
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
  resolved_at: {
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
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['priority']
    }
  ]
});

// Instance methods
Contact.prototype.markAsResolved = function() {
  this.status = 'resolved';
  this.resolved_at = new Date();
  return this.save();
};

Contact.prototype.assignTo = function(assignee) {
  this.assigned_to = assignee;
  this.status = 'in_progress';
  return this.save();
};

// Class methods
Contact.getByStatus = function(status) {
  return this.findAll({
    where: { status },
    order: [['created_at', 'DESC']]
  });
};

Contact.getRecent = function(limit = 10) {
  return this.findAll({
    order: [['created_at', 'DESC']],
    limit
  });
};

Contact.searchByEmail = function(email) {
  return this.findAll({
    where: {
      email: {
        [sequelize.Sequelize.Op.like]: `%${email}%`
      }
    },
    order: [['created_at', 'DESC']]
  });
};

module.exports = Contact;
