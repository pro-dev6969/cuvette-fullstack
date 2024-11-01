// src/components/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/auth';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL query parameter
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    // Function to verify email
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await verifyEmail(token);
          setMessage(response.message || 'Email verified successfully! Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
          setMessage('Verification failed: ' + (error.response?.data.message || error.message));
        }
      } else {
        setMessage('Invalid or missing verification token.');
      }
    };

    verifyToken();
  }, [location, navigate]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
