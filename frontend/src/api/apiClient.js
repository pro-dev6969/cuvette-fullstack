// src/api/apiClient.js
import axios from 'axios';


// Create an Axios instance with base URL and headers
const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_BACKEND_URL, // Backend URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token if it exists
  }
  return config;
});

export default apiClient;
