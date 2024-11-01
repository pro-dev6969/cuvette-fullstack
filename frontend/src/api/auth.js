// src/api/auth.js
import apiClient from './apiClient';

// Register a new company
export const registerCompany = async (data) => {
  const response = await apiClient.post('/api/register', data);
  return response.data;
};

// Login an existing company
export const loginCompany = async (data) => {
  const response = await apiClient.post('/api/login', data);
  return response.data;
};

// Verify email using token
export const verifyEmail = async (token) => {
  const response = await apiClient.get(`/api/verify-email?token=${token}`);
  return response.data;
};
