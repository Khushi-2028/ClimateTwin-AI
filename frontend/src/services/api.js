import axios from 'axios';

// API Base URL from environment variable or default to localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch backend health status
 * Endpoint: GET /health
 */
export const getHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error (/health):', error.message);
    return { 
      success: false, 
      error: error.message || 'Unable to reach backend API'
    };
  }
};

/**
 * Fetch root backend endpoint
 * Endpoint: GET /
 */
export const getRootInfo = async () => {
  try {
    const response = await apiClient.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error (/):', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch single-step AI prediction
 * Endpoint: GET /predict
 */
export const getPredict = async () => {
  try {
    const response = await apiClient.get('/predict');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error (/predict):', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch 7-day AI climate forecast
 * Endpoint: GET /predict/7days
 */
export const get7DaysPredict = async () => {
  try {
    const response = await apiClient.get('/predict/7days');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error (/predict/7days):', error.message);
    return { success: false, error: error.message };
  }
};

export default {
  getHealth,
  getRootInfo,
  getPredict,
  get7DaysPredict,
  API_BASE_URL,
};
