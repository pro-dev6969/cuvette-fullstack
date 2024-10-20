// models/Company.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,  // Initially false until email/mobile verification is complete
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',  // Reference to Job model
  }],
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
