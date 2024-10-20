// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Set the default status code to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    // Send the error response with a standardized structure
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Show stack trace only in development mode
    });
  };
  
  module.exports = { errorHandler };
  