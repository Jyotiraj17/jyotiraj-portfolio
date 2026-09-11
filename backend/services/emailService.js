/**
 * Email Service using Nodemailer and Gmail SMTP
 * Sends notifications to site owner upon new contact form submissions.
 */

const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const transporter = createTransporter();

// Verify transporter if credentials exist
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter.verify((error, success) => {
    if (error) {
      console.warn('⚠️  Nodemailer transporter verification failed:', error.message);
      console.warn('   Please ensure a valid 16-character Gmail App Password is used in EMAIL_PASSWORD.');
    } else {
      console.log('✅ Email service is ready to send messages via Gmail.');
    }
  });
} else {
  console.log('ℹ️  EMAIL_USER or EMAIL_PASSWORD not set in .env. Email notifications are currently unconfigured.');
}

/**
 * Send Contact Notification Email
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<Object>} - Nodemailer send result
 */
async function sendContactEmail({ name, email, subject, message }) {
  const recipient = process.env.EMAIL_USER;

  if (!recipient || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email notification failed: EMAIL_USER or EMAIL_PASSWORD is not configured in .env');
  }

  const mailSubject = `New Portfolio Contact Message from ${name}`;

  const textBody = `
New message received through your portfolio website.

Name: ${name}

Email: ${email}

${subject ? `Subject: ${subject}\n\n` : ''}Message:
${message}

--------------------------------
This message was sent from your portfolio contact form.
`.trim();

  const htmlBody = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px;">
  <div style="margin-bottom: 20px; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
    <h2 style="color: #6366f1; margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
  </div>
  
  <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #6366f1; text-decoration: none;">${escapeHtml(email)}</a></p>
  ${subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
  
  <div style="margin-top: 16px;">
    <strong>Message:</strong>
    <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #6366f1; margin-top: 8px; white-space: pre-wrap; font-size: 15px; color: #334155;">${escapeHtml(message)}</div>
  </div>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0 15px;">
  <p style="font-size: 12px; color: #94a3b8; margin: 0;">
    This message was sent from your portfolio contact form.<br>
    Click "Reply" to respond directly to ${escapeHtml(name)} (${escapeHtml(email)}).
  </p>
</div>
`;

  const mailOptions = {
    from: `"Portfolio Contact Form" <${recipient}>`,
    to: recipient,
    replyTo: email,
    subject: mailSubject,
    text: textBody,
    html: htmlBody
  };

  return await transporter.sendMail(mailOptions);
}

// Basic HTML escaping to protect email rendering
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  transporter,
  sendContactEmail
};
