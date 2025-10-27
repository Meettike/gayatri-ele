const express = require('express');
const { body, validationResult } = require('express-validator');
const { createTransporter, emailTemplates } = require('../config/email');
const Contact = require('../models/Contact');
const EmailLog = require('../models/EmailLog');

const router = express.Router();


// Validation middleware for contact form
const validateContactForm = [
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
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// Submit contact form
router.post('/submit', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, company, subject, message } = req.body;
    
    const contactData = {
      name,
      email,
      phone,
      company,
      subject,
      message,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    };

    // Validate email configuration before proceeding
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing. Please check EMAIL_USER and EMAIL_PASS environment variables.');
    }

    // Try to save to database (optional - will continue if fails)
    let savedContact = null;
    let dbAvailable = false;
    try {
      savedContact = await Contact.create(contactData);
      dbAvailable = true;
      console.log('✅ Contact saved to database:', savedContact.id);
    } catch (dbError) {
      console.log('ℹ️  Database not available, continuing with email-only mode:', dbError.message);
      // Create a mock saved contact object for email processing
      savedContact = {
        id: `temp_${Date.now()}`,
        ...contactData
      };
    }

    const transporter = createTransporter();
    
    // Send notification email to company
    const companyEmailContent = emailTemplates.contactForm(contactData);
    const companyMailOptions = {
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: companyEmailContent.subject,
      text: companyEmailContent.text,
      replyTo: email
    };

    // Send auto-reply to customer
    const autoReplyContent = emailTemplates.contactAutoReply(contactData);
    const autoReplyOptions = {
      from: `"${process.env.COMPANY_NAME || 'Gayatri Electricals'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: autoReplyContent.subject,
      text: autoReplyContent.text
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
          recipient_name: type === 'contact_form' ? 'Admin' : name,
          subject: subject,
          template_used: type === 'contact_form' ? 'contactForm' : 'contactAutoReply',
          status: status,
          message_id: messageId,
          error_message: error,
          related_contact_id: savedContact && savedContact.id ? savedContact.id : null,
          ip_address: req.ip,
          user_agent: req.get('User-Agent')
        });
      } catch (logError) {
        console.log('ℹ️  Email log save failed (continuing):', logError.message);
      }
    };

    // Send both emails
    const [companyEmailResult, autoReplyResult] = await Promise.allSettled([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    // Log email results
    if (companyEmailResult.status === 'fulfilled') {
      await createEmailLog('contact_form', process.env.COMPANY_EMAIL || process.env.EMAIL_USER, 
                          companyEmailContent.subject, 'sent', companyEmailResult.value.messageId);
    } else {
      await createEmailLog('contact_form', process.env.COMPANY_EMAIL || process.env.EMAIL_USER, 
                          companyEmailContent.subject, 'failed', null, companyEmailResult.reason?.message);
    }

    if (autoReplyResult.status === 'fulfilled') {
      await createEmailLog('auto_reply', email, autoReplyContent.subject, 'sent', autoReplyResult.value.messageId);
    } else {
      await createEmailLog('auto_reply', email, autoReplyContent.subject, 'failed', null, autoReplyResult.reason?.message);
    }

    // Log results
    console.log('Contact form submission processed:', {
      contactId: savedContact ? savedContact.id : null,
      name,
      email,
      subject,
      companyEmailSent: companyEmailResult.status === 'fulfilled',
      autoReplySent: autoReplyResult.status === 'fulfilled',
      timestamp: new Date().toISOString()
    });

    // Check if at least the company notification was sent
    if (companyEmailResult.status === 'rejected') {
      throw new Error('Failed to send notification email');
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      details: {
        notificationSent: companyEmailResult.status === 'fulfilled',
        autoReplySent: autoReplyResult.status === 'fulfilled',
        databaseAvailable: dbAvailable
      }
    });

  } catch (error) {
    console.error('Contact form submission failed:', error);
    
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: 'Please try again later or contact us directly via phone.'
    });
  }
});



module.exports = router;
