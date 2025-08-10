# Medkit.AI Chatbot Backend

This is the backend service for Medkit.AI's AI Health Assistant chatbot.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `PORT`: Port number (default: 5002)
   - `NODE_ENV`: Environment (production/development)

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /chat_assistant` - Chat with AI health assistant
- `GET /chat_history/:sessionId` - Get chat history for a session
- `DELETE /chat_history/:sessionId` - Clear chat history for a session

## Deployment

This service is configured for Railway deployment with the Procfile.
