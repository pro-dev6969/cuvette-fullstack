// models/Job.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Entry', 'Mid', 'Senior'],  // You can adjust this based on your requirement
  },
  endDate: {
    type: Date,
    required: true,
  },
  candidates: [{
    type: String,  // Array of candidate emails
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',  // Reference to Company model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
