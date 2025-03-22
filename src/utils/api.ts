import axios from 'axios';

// Get the port from the environment or use 5001 for development
const API_PORT = process.env.REACT_APP_API_PORT || '5001';
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:${API_PORT}/api`;

console.log('API URL:', API_URL);

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// A variable to store the current auth token
let authToken: string | null = null;

// Function to set the token (to be called from components)
export const setAuthToken = (token: string | null) => {
  console.log(`Setting auth token: ${token ? 'Token provided' : 'No token'}`);
  authToken = token;
};

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
      console.log('Request with auth token:', config.method?.toUpperCase(), config.url);
    } else {
      console.log('Request without auth token:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    // Log all API errors
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });

    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request detected (401)');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 