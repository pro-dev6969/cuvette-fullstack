// routes/auth.js
const express = require('express');
const { registerCompany, loginCompany, logoutCompany , verifyEmail , deleteCompany} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/register - Register a company
router.post('/register', registerCompany);

// POST /api/login - Login a company
router.post('/login', loginCompany);

// POST /api/logout - Logout a company
router.post('/logout', logoutCompany);

// Email verification route
router.get('/verify-email', verifyEmail);

// DELETE /api/delete-company - Delete a company (Requires authentication)
router.delete('/delete-company', authMiddleware, deleteCompany);

module.exports = router;
