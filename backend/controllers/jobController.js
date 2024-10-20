// controllers/jobController.js
const Job = require('../models/Job');
const Company = require('../models/Company');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/emailSender');

// Post a job
const postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;
  const companyId = req.user.id;

  try {
    const job = new Job({ title, description, experienceLevel, endDate, candidates, company: companyId });
    await job.save();
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error posting job', error });
  }
};

// Send emails to candidates
const sendJobEmails = async (req, res) => {
    const { candidates, jobId } = req.body;
  
    try {
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      const emailContent = `
        <h3>Job Title: ${job.title}</h3>
        <p>${job.description}</p>
        <p>Experience Level: ${job.experienceLevel}</p>
        <p>End Date: ${job.endDate}</p>
      `;
  
      // Send emails to all candidates
      for (const candidateEmail of candidates) {
        await sendEmail(candidateEmail, 'New Job Alert: ' + job.title, emailContent);
      }
  
      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending emails', error });
    }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('company', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

module.exports = { postJob, sendJobEmails, getJobs };
