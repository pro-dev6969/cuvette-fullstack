// src/pages/VerifyEmailPage.jsx
import React from 'react';
import VerifyEmail from '../components/VerifyEmail';

const VerifyEmailPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Email Verification</h1>
        <p className="text-center text-gray-600 mb-4">
          We are verifying your email. Please wait a moment.
        </p>
        <VerifyEmail />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
