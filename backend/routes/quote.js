const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const { createTransporter, emailTemplates } = require('../config/email');
const QuoteRequest = require('../models/QuoteRequest');
const EmailLog = require('../models/EmailLog');

const router = express.Router();


// Simple file upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Validation middleware for quote request
const validateQuoteRequest = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location must be less than 200 characters'),
  
  body('productType')
    .trim()
    .isIn(['transformers', 'servo-stabilizers', 'wires-cables', 'other'])
    .withMessage('Please select a valid product type'),
  
  body('specifications')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Specifications must be less than 1000 characters'),
  
  body('quantity')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Quantity must be less than 100 characters'),
  
  body('budgetRange')
    .optional()
    .trim()
    .isIn(['under-1-lakh', '1-5-lakh', '5-25-lakh', '25-lakh-plus', 'not-specified'])
    .withMessage('Please select a valid budget range'),
  
  body('timeline')
    .optional()
    .trim()
    .isIn(['immediate', '1-month', '3-months', '6-months', 'flexible'])
    .withMessage('Please select a valid timeline'),
  
  body('additionalRequirements')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Additional requirements must be less than 2000 characters'),
];

// Submit quote request
router.post('/submit', upload.array('attachments', 3), validateQuoteRequest, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      company,
      location,
      productType,
      specifications,
      quantity,
      budgetRange,
      timeline,
      additionalRequirements
    } = req.body;

    // Process attachments
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    })) : [];

    const quoteData = {
      name,
      email,
      phone,
      company,
      location,
      product_type: productType,
      specifications,
      quantity,
      budget_range: budgetRange,
      timeline,
      additional_requirements: additionalRequirements,
      attachments: attachments.length > 0 ? attachments.map(att => ({
        filename: att.filename,
        contentType: att.contentType,
        size: att.content.length
      })) : null,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    };

    // Generate quote number manually to ensure it's set
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const quoteNumber = `GE${year}${month}${day}${random}`;

    // Add quote number to data
    quoteData.quote_number = quoteNumber;

    // Try to save to database (optional - will continue if fails)
    let savedQuote = null;
    let dbAvailable = false;
    try {
      savedQuote = await QuoteRequest.create(quoteData);
      dbAvailable = true;
      console.log('✅ Quote request saved to database:', savedQuote.id, 'Quote Number:', savedQuote.quote_number);
    } catch (dbError) {
      console.log('ℹ️  Database not available, continuing with email-only mode:', dbError.message);
      // Create a mock saved quote object for email processing
      savedQuote = {
        id: `temp_${Date.now()}`,
        quote_number: quoteNumber,
        ...quoteData
      };
    }

    // Validate email configuration before proceeding
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing. Please check EMAIL_USER and EMAIL_PASS environment variables.');
    }

    const transporter = createTransporter();
    
    // Prepare quote data for email templates
    const emailQuoteData = {
      ...quoteData,
      productType: productType,
      quoteNumber: quoteNumber
    };
    
    // Send quote request email to company
    const quoteEmailContent = emailTemplates.quoteRequest(emailQuoteData);
    const quoteMailOptions = {
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `${quoteEmailContent.subject} - Quote #${quoteNumber}`,
      text: quoteEmailContent.text,
      replyTo: email,
      attachments: attachments
    };

    // Send confirmation email to customer (plain text only)
    const confirmationContent = {
      subject: `Quote Request Received - Quote #${quoteNumber} - Gayatri Electricals & Electronics`,
      text: `Dear ${name},

Thank you for your quote request for ${productType}. We have received your inquiry and our technical team will review your requirements.

We will prepare a detailed quotation and get back to you within 2-3 business days. Our team may contact you for any additional clarifications if needed.

Request Summary:
Quote Number: ${quoteNumber}
Product Type: ${productType}
Quantity: ${quantity || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Budget Range: ${budgetRange || 'Not specified'}
Submitted on: ${new Date().toLocaleString()}

Need Immediate Assistance?
Email: ${process.env.COMPANY_EMAIL || 'info@gayatrielectricals.com'}
Phone: +91 XXXXX XXXXX
Website: www.gayatrielectricals.com

Best regards,
Gayatri Electricals & Electronics Team`
    };

    const confirmationOptions = {
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: confirmationContent.subject,
      text: confirmationContent.text
    };

    // Create email log entries (only if database is available)
    const createEmailLog = async (type, recipient, subject, status, messageId = null, error = null) => {
      if (!dbAvailable) {
        console.log(`📧 Email Log (DB unavailable): ${type} to ${recipient} - ${status}`);
        return;
      }
      try {
        await EmailLog.create({
          email_type: type,
          sender_email: process.env.EMAIL_USER,
          sender_name: process.env.COMPANY_NAME || 'Gayatri Electricals',
          recipient_email: recipient,
          recipient_name: type === 'quote_request' ? 'Admin' : name,
          subject: subject,
          template_used: type === 'quote_request' ? 'quoteRequest' : 'custom',
          status: status,
          message_id: messageId,
          error_message: error,
          related_quote_id: savedQuote && savedQuote.id ? savedQuote.id : null,
          ip_address: req.ip,
          user_agent: req.get('User-Agent')
        });
      } catch (logError) {
        console.log('ℹ️  Email log save failed (continuing):', logError.message);
      }
    };

    // Send both emails
    const [quoteEmailResult, confirmationResult] = await Promise.allSettled([
      transporter.sendMail(quoteMailOptions),
      transporter.sendMail(confirmationOptions)
    ]);

    // Log email results
    if (quoteEmailResult.status === 'fulfilled') {
      await createEmailLog('quote_request', process.env.COMPANY_EMAIL || process.env.EMAIL_USER, 
                          quoteEmailContent.subject, 'sent', quoteEmailResult.value.messageId);
    } else {
      await createEmailLog('quote_request', process.env.COMPANY_EMAIL || process.env.EMAIL_USER, 
                          quoteEmailContent.subject, 'failed', null, quoteEmailResult.reason?.message);
    }

    if (confirmationResult.status === 'fulfilled') {
      await createEmailLog('auto_reply', email, confirmationContent.subject, 'sent', confirmationResult.value.messageId);
    } else {
      await createEmailLog('auto_reply', email, confirmationContent.subject, 'failed', null, confirmationResult.reason?.message);
    }

    // Log results
    console.log('Quote request processed:', {
      quoteId: savedQuote ? savedQuote.id : null,
      quoteNumber: savedQuote ? savedQuote.quote_number : null,
      name,
      email,
      productType,
      attachmentCount: attachments.length,
      quoteEmailSent: quoteEmailResult.status === 'fulfilled',
      confirmationSent: confirmationResult.status === 'fulfilled',
      timestamp: new Date().toISOString()
    });

    // Check if at least the quote request was sent
    if (quoteEmailResult.status === 'rejected') {
      throw new Error('Failed to send quote request email');
    }

    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully. We will get back to you within 2-3 business days.',
      quoteNumber: quoteNumber,
      details: {
        quoteRequestSent: quoteEmailResult.status === 'fulfilled',
        confirmationSent: confirmationResult.status === 'fulfilled',
        attachmentsProcessed: attachments.length,
        databaseAvailable: dbAvailable
      }
    });

  } catch (error) {
    console.error('Quote request submission failed:', error);
    
    
    res.status(500).json({
      error: 'Failed to submit quote request',
      message: 'Please try again later or contact us directly via phone.'
    });
  }
});



module.exports = router;
