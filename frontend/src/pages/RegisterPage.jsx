// src/pages/RegisterPage.jsx
import React from 'react';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Your Company</h1>
        <p className="text-center text-gray-600 mb-4">
          Create an account to manage your job postings and access more features.
        </p>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
