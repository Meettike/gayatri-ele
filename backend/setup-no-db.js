#!/usr/bin/env node

/**
 * Gayatri Electricals Backend Setup (No Database Required)
 * 
 * This script sets up the backend to work without a database.
 * All functionality will work through email-only mode.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Gayatri Electricals Backend (Email-Only Mode)');
console.log('================================================');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    // Copy .env.example to .env
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
  } else {
    // Create a basic .env file
    const basicEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Company Email Settings
COMPANY_EMAIL=your-email@gmail.com
COMPANY_NAME=Gayatri Electricals & Electronics

# CORS Settings
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png
`;
    fs.writeFileSync(envPath, basicEnvContent);
    console.log('✅ Created basic .env file');
  }
} else {
  console.log('ℹ️  .env file already exists');
}

console.log('\n📧 Email-Only Mode Configuration');
console.log('================================');
console.log('✅ Backend will work without database');
console.log('✅ All emails will be sent successfully');
console.log('✅ Quote requests will generate unique quote numbers');
console.log('✅ Contact forms will send notifications');
console.log('⚠️  No data persistence (emails only)');

console.log('\n🔧 Next Steps:');
console.log('==============');
console.log('1. Update your .env file with correct email credentials:');
console.log('   - EMAIL_USER: Your Gmail address');
console.log('   - EMAIL_PASS: Your Gmail App Password (not regular password)');
console.log('   - COMPANY_EMAIL: Where you want to receive notifications');
console.log('');
console.log('2. To get Gmail App Password:');
console.log('   - Go to Google Account settings');
console.log('   - Enable 2-Factor Authentication');
console.log('   - Generate App Password for "Mail"');
console.log('   - Use that password in EMAIL_PASS');
console.log('');
console.log('3. Start the server:');
console.log('   npm start');
console.log('');
console.log('4. Test the API:');
console.log('   GET  http://localhost:5000/api/health');
console.log('   POST http://localhost:5000/api/quote/submit');
console.log('   POST http://localhost:5000/api/contact/submit');

console.log('\n✨ Setup Complete! Your backend is ready to run without a database.');
