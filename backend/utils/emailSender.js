// utils/emailSender.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',  // You can change to other providers like Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER,   // Email address from .env file
        pass: process.env.EMAIL_PASS,   // Email password from .env file
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,      // Sender email address
      to,                                // Recipient email address
      subject,                           // Email subject
      html: htmlContent,                 // HTML content for the email
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
