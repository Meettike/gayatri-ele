const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database');
const contactRoutes = require('./routes/contact');
const quoteRoutes = require('./routes/quote');

const app = express();
const PORT = process.env.PORT || 5000;

// Simple CORS - Allow all origins in development
app.use(cors({
  origin: true,
  credentials: true
}));


// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/quote', quoteRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Server error' });
});


// Start server
const startServer = async () => {
  try {
    const dbConnected = await testConnection();
    if (dbConnected) await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Database: ${dbConnected ? 'Connected' : 'Email-only mode'}`);
    });
  } catch (error) {
    console.error('Server start failed:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
