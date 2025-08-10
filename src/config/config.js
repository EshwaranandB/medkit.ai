// Configuration for different environments
const config = {
  development: {
    prescriptionApi: 'http://localhost:5001',
    chatbotApi: 'http://localhost:5002'
  },
  production: {
    // TODO: Replace with your actual deployed backend URLs
    prescriptionApi: 'https://your-prescription-backend.railway.app',
    chatbotApi: 'https://your-chatbot-backend.railway.app'
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
