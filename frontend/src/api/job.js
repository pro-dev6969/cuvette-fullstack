// src/api/job.js
import apiClient from './apiClient';

// Get all job postings
export const getJobs = async () => {
  const response = await apiClient.get('/api/jobs');
  return response.data;
};

// Create a new job posting
export const createJob = async (data) => {
  const response = await apiClient.post('/api/jobs', data);
  return response.data;
};

// Send job-related emails to candidates
export const sendJobEmails = async (jobId, candidates) => {
  const response = await apiClient.post(`/api/jobs/send-email`, { jobId, candidates });
  return response.data;
};
