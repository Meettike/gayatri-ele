const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, subject, message } = req.body;
    
    // Log the received data for debugging
    console.log('Received contact form data:', { name, email, phone, company, subject, message });
    
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'message'],
        received: { name: !!name, email: !!email, message: !!message, subject: !!subject }
      });
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({
        error: 'Email service not configured',
        message: 'Please contact us directly at tikemeet3@gmail.com'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const emailSubject = subject || 'General Inquiry';
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Subject: ${emailSubject}

Message:
${message}

Submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    console.log('Attempting to send email...');
    const emailResult = await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${emailSubject}`,
      text: emailContent,
      replyTo: email
    });
    
    console.log('Email sent successfully:', emailResult.messageId);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: 'Please try again later or contact us directly at tikemeet3@gmail.com',
      details: error.message
    });
  }
}
