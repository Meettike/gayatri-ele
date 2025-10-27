const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmailLog = sequelize.define('EmailLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email_type: {
    type: DataTypes.ENUM('contact_form', 'quote_request', 'auto_reply', 'custom', 'bulk'),
    allowNull: false
  },
  sender_email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sender_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  recipient_email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  recipient_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  template_used: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'failed', 'bounced', 'delivered'),
    defaultValue: 'pending'
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  retry_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  related_contact_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'contacts',
      key: 'id'
    }
  },
  related_quote_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'quote_requests',
      key: 'id'
    }
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  delivered_at: {
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
  tableName: 'email_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['recipient_email']
    },
    {
      fields: ['sender_email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['email_type']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['message_id']
    },
    {
      fields: ['related_contact_id']
    },
    {
      fields: ['related_quote_id']
    }
  ]
});

// Instance methods
EmailLog.prototype.markAsSent = function(messageId) {
  this.status = 'sent';
  this.message_id = messageId;
  this.sent_at = new Date();
  return this.save();
};

EmailLog.prototype.markAsFailed = function(errorMessage) {
  this.status = 'failed';
  this.error_message = errorMessage;
  this.retry_count += 1;
  return this.save();
};

EmailLog.prototype.markAsDelivered = function() {
  this.status = 'delivered';
  this.delivered_at = new Date();
  return this.save();
};

// Class methods
EmailLog.getByStatus = function(status) {
  return this.findAll({
    where: { status },
    order: [['created_at', 'DESC']]
  });
};

EmailLog.getByEmailType = function(emailType) {
  return this.findAll({
    where: { email_type: emailType },
    order: [['created_at', 'DESC']]
  });
};

EmailLog.getByRecipient = function(email) {
  return this.findAll({
    where: { recipient_email: email },
    order: [['created_at', 'DESC']]
  });
};

EmailLog.getFailedEmails = function() {
  return this.findAll({
    where: { status: 'failed' },
    order: [['created_at', 'DESC']]
  });
};

EmailLog.getEmailStats = async function(startDate, endDate) {
  const whereClause = {};
  
  if (startDate && endDate) {
    whereClause.created_at = {
      [sequelize.Sequelize.Op.between]: [startDate, endDate]
    };
  }

  const stats = await this.findAll({
    attributes: [
      'status',
      'email_type',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ],
    where: whereClause,
    group: ['status', 'email_type'],
    raw: true
  });

  return stats;
};

EmailLog.getRecentActivity = function(limit = 50) {
  return this.findAll({
    order: [['created_at', 'DESC']],
    limit,
    attributes: [
      'id', 'email_type', 'recipient_email', 'subject', 
      'status', 'sent_at', 'created_at'
    ]
  });
};

module.exports = EmailLog;
