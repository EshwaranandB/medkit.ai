// Configuration for different environments
const config = {
  development: {
    prescriptionApi: 'http://localhost:5001',
    chatbotApi: 'http://localhost:5002'
  },
  production: {
    prescriptionApi: 'https://prescriptionbackend.up.railway.app',
    chatbotApi: 'https://chatbotbackend.up.railway.app'
  }
};

// Get current environment
const isDevelopment = import.meta.env.DEV;
const currentConfig = isDevelopment ? config.development : config.production;

export const API_URLS = {
  prescriptionApi: currentConfig.prescriptionApi,
  chatbotApi: currentConfig.chatbotApi
};

export default config;
