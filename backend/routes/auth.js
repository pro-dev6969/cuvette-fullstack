// routes/auth.js
const express = require('express');
const { registerCompany, loginCompany, logoutCompany } = require('../controllers/authController');

const router = express.Router();

// POST /api/register - Register a company
router.post('/register', registerCompany);

// POST /api/login - Login a company
router.post('/login', loginCompany);

// POST /api/logout - Logout a company
router.post('/logout', logoutCompany);

module.exports = router;
