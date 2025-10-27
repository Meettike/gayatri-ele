const nodemailer = require('nodemailer');

export default async function handler(req, res) {
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
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Subject: ${subject}

Message:
${message}

Submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: emailContent,
      replyTo: email
    });

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: 'Please try again later'
    });
  }
}
