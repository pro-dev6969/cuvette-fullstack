// utils/tokenGenerator.js
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
  //  expiresIn: '1h',  // Token expiration time (can be changed as needed)
  });
};

module.exports = generateToken;
