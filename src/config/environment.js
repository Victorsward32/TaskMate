import { API_BASE_URL, ENV } from '@env';

// Configuration for different environments
const config = {
  development: {
    apiUrl: API_BASE_URL || 'https://taskmate-backend-zibt.onrender.com',
    timeout: 30000, // 30 seconds
  },
  production: {
    apiUrl: API_BASE_URL,
    timeout: 30000,
  },
};

// Get current environment configuration
const getEnvironmentConfig = () => {
  return config[ENV] || config.development;
};

export default getEnvironmentConfig();