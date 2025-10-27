const { Sequelize } = require('sequelize');

// Create Sequelize instance using DATABASE_URL or fallback to individual parameters
let sequelize;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL (recommended)
  console.log('🔗 Using DATABASE_URL for connection');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  });
} else {
  // Fallback to individual parameters
  console.log('🔧 Using individual database parameters');
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'gayatri_electricals',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  };

  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      pool: dbConfig.pool,
      define: dbConfig.define
    }
  );
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

// Initialize database (create tables if they don't exist)
const initializeDatabase = async () => {
  try {
    // Import models
    const Contact = require('../models/Contact');
    const QuoteRequest = require('../models/QuoteRequest');
    const EmailLog = require('../models/EmailLog');

    // Sync all models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database tables synchronized successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('📴 Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
  }
};

module.exports = {
  sequelize,
  testConnection,
  initializeDatabase,
  closeConnection
};
