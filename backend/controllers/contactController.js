/**
 * Contact Controller
 * Handles visitor contact form submissions:
 * 1. Validates and sanitizes input data.
 * 2. Persists message to MongoDB Atlas.
 * 3. Sends email notification to owner's Gmail via Nodemailer.
 */

const ContactMessage = require('../models/ContactMessage');
const { getDBStatus } = require('../config/db');
const { sendContactEmail } = require('../services/emailService');

exports.submitContact = async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;

    // 1. Sanitize & Trim Strings
    name = typeof name === 'string' ? name.trim() : '';
    email = typeof email === 'string' ? email.trim() : '';
    subject = typeof subject === 'string' ? subject.trim() : 'Portfolio Contact';
    message = typeof message === 'string' ? message.trim() : '';

    // 2. Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address (max 150 characters).'
      });
    }

    if (subject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject cannot exceed 200 characters.'
      });
    }

    if (message.length < 5 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 5 and 5000 characters.'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 3. Save to MongoDB Atlas
    let savedMessage = null;

    if (getDBStatus()) {
      try {
        savedMessage = await ContactMessage.create({
          name,
          email,
          subject,
          message,
          ip: clientIp
        });
        console.log(`✅ [MongoDB] Contact message saved successfully from: ${name} (${email}) [ID: ${savedMessage._id}]`);
      } catch (dbError) {
        console.error('❌ [MongoDB Error] Failed to save contact message:', dbError);
        // If database storage fails, DO NOT send email, return server error
        return res.status(500).json({
          success: false,
          message: 'Failed to save your message. Please try again later.'
        });
      }
    } else {
      // In-memory fallback if MongoDB connection is inactive in dev
      console.log(`ℹ️ [In-Memory] Contact message recorded (MongoDB offline): ${name} (${email})`);
      savedMessage = { name, email, subject, message, receivedAt: new Date() };
    }

    // 4. Send Email Notification via Nodemailer
    try {
      await sendContactEmail({ name, email, subject, message });
      console.log(`📧 [Nodemailer] Contact notification email successfully dispatched to ${process.env.EMAIL_USER}`);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
        data: savedMessage
      });
    } catch (emailError) {
      // IMPORTANT: Message remains saved in MongoDB; log actual error for debugging
      console.error('❌ [Nodemailer Error] Failed to send email notification:', emailError.message);

      return res.status(500).json({
        success: false,
        savedInDb: true,
        message: 'Your message was saved successfully, but email notification could not be sent.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

  } catch (error) {
    console.error('❌ [Server Error] Unexpected contact submission failure:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
};
