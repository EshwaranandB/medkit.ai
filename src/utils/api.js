// Simple API client for Medkit AI
// Provides methods for fetching library statistics and other data

const apiClient = {
  // Get library statistics
  async getLibraryStats() {
    try {
      // For now, return mock data since the actual implementation isn't clear
      // This can be updated later with real API calls
      return {
        totalTopics: 17266,
        totalCategories: 7,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching library stats:', error);
      return {
        totalTopics: 17266,
        totalCategories: 7,
        lastUpdated: new Date().toISOString()
      };
    }
  },

  // Add other API methods here as needed
};

export default apiClient;
