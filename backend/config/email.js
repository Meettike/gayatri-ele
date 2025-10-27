const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(config);
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error.message);
    return false;
  }
};

// Email templates (Plain text only)
const emailTemplates = {
  // Contact form submission
  contactForm: (data) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    text: `New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

Submitted on: ${new Date().toLocaleString()}`
  }),

  // Quote request submission
  quoteRequest: (data) => ({
    subject: `New Quote Request from ${data.name} - ${data.productType}`,
    text: `New Quote Request

Customer Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Not provided'}
Location: ${data.location || 'Not provided'}

Product Requirements:
Product Type: ${data.productType}
Specifications: ${data.specifications || 'Not specified'}
Quantity: ${data.quantity || 'Not specified'}
Budget Range: ${data.budgetRange || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

${data.additionalRequirements ? `Additional Requirements:\n${data.additionalRequirements}\n` : ''}

Submitted on: ${new Date().toLocaleString()}`
  }),

  // Auto-reply for contact form
  contactAutoReply: (data) => ({
    subject: 'Thank you for contacting Gayatri Electricals & Electronics',
    text: `Dear ${data.name},

Thank you for contacting Gayatri Electricals & Electronics. We have received your message and appreciate your interest in our products and services.

Our team will review your inquiry and get back to you within 24 hours. In the meantime, feel free to explore our product range on our website.

Your Message Summary:
Subject: ${data.subject}
Submitted on: ${new Date().toLocaleString()}

Contact Information:
Email: info@gayatrielectricals.com
Phone: +91 XXXXX XXXXX
Address: Your Company Address

Best regards,
Gayatri Electricals & Electronics Team`
  })
};

module.exports = {
  createTransporter,
  verifyEmailConfig,
  emailTemplates
};
