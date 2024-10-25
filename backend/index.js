// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const { errorHandler } = require('./middlewares/errorHandler');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);   // Authentication routes (register, login, logout)
app.use('/api', jobRoutes);    // Job-related routes (post jobs, send emails)

// Error handling middleware
app.use(errorHandler);

// Set up a default route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Posting Board API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

