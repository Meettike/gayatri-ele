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
  
  if (req.method === 'GET') {
    // Return product specs
    return res.status(200).json({
      success: true,
      message: 'Quote API is working'
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      name, email, phone, company, location, 
      productType, specifications, quantity, 
      budgetRange, timeline, additionalRequirements 
    } = req.body;
    
    if (!name || !email || !phone || !productType) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'phone', 'productType']
      });
    }

    // Generate quote number
    const quoteNumber = `GE${Date.now()}`;

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
New Quote Request - ${quoteNumber}

Customer Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || 'Not provided'}
Location: ${location || 'Not provided'}

Product Requirements:
Product Type: ${productType}
Specifications: ${specifications || 'Not provided'}
Quantity: ${quantity || 'Not specified'}
Budget Range: ${budgetRange || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

Additional Requirements:
${additionalRequirements || 'None'}

Submitted on: ${new Date().toLocaleString()}
    `;

    // Send email
    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `Quote Request ${quoteNumber} - ${productType}`,
      text: emailContent,
      replyTo: email
    });

    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteNumber: quoteNumber
    });

  } catch (error) {
    console.error('Quote request error:', error);
    res.status(500).json({
      error: 'Failed to submit quote request',
      message: 'Please try again later'
    });
  }
}
