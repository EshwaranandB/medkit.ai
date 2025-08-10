# Medkit.AI Prescription Reader Backend

This is the backend service for Medkit.AI's Prescription Reader tool.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `PORT`: Port number (default: 5001)
   - `NODE_ENV`: Environment (production/development)

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /analyze_prescription` - Analyze prescription images using AI

## Deployment

This service is configured for Railway deployment with the Procfile.
