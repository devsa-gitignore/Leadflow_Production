import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle common logic if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401 Unauthorized
    if (error.response?.status === 401) {
      // Potentially clear session or redirect to login
      // localStorage.removeItem('leadflow_user');
    }
    return Promise.reject(error);
  }
);

export default api;
