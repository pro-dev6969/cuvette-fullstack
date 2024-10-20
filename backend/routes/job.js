// routes/job.js
const express = require('express');
const { postJob, sendJobEmails, getJobs } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/jobs - Post a job (Requires authentication)
router.post('/jobs', authMiddleware, postJob);

// POST /api/jobs/send-email - Send job-related emails (Requires authentication)
router.post('/jobs/send-email', authMiddleware, sendJobEmails);

// GET /api/jobs - Retrieve all jobs (Optional: public route)
router.get('/jobs', getJobs);

module.exports = router;
