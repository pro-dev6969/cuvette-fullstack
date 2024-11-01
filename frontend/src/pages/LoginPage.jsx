// src/pages/LoginPage.jsx
import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h1>
        <p className="text-center text-gray-600 mb-4">
          Access your dashboard and manage job postings.
        </p>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
