// controllers/authController.js
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/emailSender');
const nodemailer = require('nodemailer');

// Company registration

const registerCompany = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // Check if the company is already registered
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company but set 'verified' to false initially
    const company = new Company({ name, email, password: hashedPassword, mobile, verified: false });
    await company.save();

    // Generate a JWT token for verification
    const verificationToken = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a verification URL (assuming you have a route for this on your frontend)
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // Email content
    const emailContent = `
      <h3>Verify Your Email</h3>
      <p>Please click the link below to verify your email and activate your account:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;

    // Send the email using Nodemailer
    await sendEmail(email, 'Verify Your Company Account', emailContent);

    // Send a response back to the client
    res.status(201).json({ message: 'Company registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error during company registration:', error);
    res.status(500).json({ message: 'Error registering company', error });
  }
};

// Company login
const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: 'Company not found' });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Company logout
const logoutCompany = (req, res) => {
  // Clear JWT token on client side (e.g., localStorage in frontend)
  res.status(200).json({ message: 'Logged out successfully' });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const companyId = decoded.id;

    // Find the company and update the 'verified' field
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // If the company is already verified
    if (company.verified) {
      return res.status(400).json({ message: 'Company is already verified' });
    }

    company.verified = true;
    await company.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

// Delete company
const deleteCompany = async (req, res) => {
  const companyId = req.user.id;  // Extract company ID from JWT token

  try {
    // Find the company in the database
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Optional: Delete all jobs associated with this company
    // await Job.deleteMany({ company: companyId });

    // Delete the company
    await Company.findByIdAndDelete(companyId);

    // Send success response
    res.status(200).json({ message: 'Company and associated jobs deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Error deleting company' });
  }
};

module.exports = { registerCompany, loginCompany, logoutCompany , verifyEmail , deleteCompany};
