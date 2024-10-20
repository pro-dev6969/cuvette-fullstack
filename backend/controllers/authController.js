// controllers/authController.js
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Company registration
const registerCompany = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({ name, email, password: hashedPassword, mobile, verified: false });
    
    await company.save();
    
    // Send verification email using Nodemailer (left out for brevity)
    res.status(201).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
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

module.exports = { registerCompany, loginCompany, logoutCompany };
