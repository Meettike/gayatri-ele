# 🔌 Gayatri Electricals - Backend API

> **Backend API server for Gayatri Electricals & Electronics website**

This Node.js/Express backend provides email functionality, contact form processing, and quote request handling for the Gayatri Electricals website.

## ⚡ Features

- **Contact Form Processing** - Handle customer inquiries with email notifications
- **Quote Request System** - Process and manage product quote requests  
- **Email Integration** - Automated email notifications using Nodemailer
- **CORS Support** - Configured for frontend integration
- **Environment Configuration** - Secure environment-based settings
- **Error Handling** - Comprehensive error logging and responses

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Gmail account for email functionality

### Installation

1. **Clone and Install**
```bash
git clone https://github.com/YOUR_USERNAME/gayatri-electricals-backend.git
cd gayatri-electricals-backend
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
```

3. **Configure Email Settings**
Edit `.env` file with your email credentials:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
COMPANY_EMAIL=gayatrielectronics3@gmail.com
```

4. **Start Server**
```bash
npm run dev  # Development mode
npm start    # Production mode
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check endpoint |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/quote` | Submit quote request |

### Example Usage
- ✅ **Auto Database Setup** - Sequelize handles everything
- ✅ **File Uploads** - Support for attachments
- ✅ **CORS Enabled** - Works with any frontend
- ✅ **Production Ready** - Optimized for deployment

## 🎯 What's Removed

- ❌ Rate limiting (unnecessary complexity)
- ❌ HTML/CSS emails (bloat)
- ❌ Excessive logging (noise)
- ❌ Complex CORS config (overengineered)
- ❌ Unused routes (email.js)
- ❌ Extra validation (redundant)
- ❌ Health check endpoints (not needed)

Your backend is now **clean, fast, and focused** on core functionality!
