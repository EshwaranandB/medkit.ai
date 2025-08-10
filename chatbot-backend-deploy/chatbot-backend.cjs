const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// In-memory storage for conversation history (in production, use a database)
const conversationHistory = new Map();

// Chat assistant endpoint for AI chatbot with conversation continuation
app.post('/chat_assistant', express.json(), async (req, res) => {
  try {
    const { messages, sessionId = 'default' } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    // Get or create conversation history for this session
    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, []);
    }
    
    const sessionHistory = conversationHistory.get(sessionId);
    
    // Add new user message to session history
    const userMessage = messages[messages.length - 1];
    sessionHistory.push({
      role: 'user',
      content: userMessage.content,
      timestamp: new Date().toISOString()
    });

    // Prepare full conversation context for AI
    const fullConversation = [
      {
        role: 'system',
        content: 'You are a polite, helpful AI health assistant named Medkit. Respond in English. You may use the user\'s profile details like name, age, gender, profession, location, and medical history **only if they are available** to personalize the advice. Do not ask for personal information unless it is **relevant to the current health question**. Always prioritize user comfort and privacy. Remember previous conversations and provide contextual responses.'
      },
      ...sessionHistory
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: fullConversation,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Medkit.AI',
        },
      }
    );
    
    const reply = response.data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    // Add AI response to session history
    sessionHistory.push({
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString()
    });

    // Keep only last 20 messages to prevent context from getting too long
    if (sessionHistory.length > 20) {
      sessionHistory.splice(0, sessionHistory.length - 20);
    }

    res.json({ reply, sessionId });
  } catch (err) {
    console.error('Error in /chat_assistant:', err);
    res.status(500).json({ error: 'Failed to get AI response', details: err.message });
  }
});

// Get conversation history for a session
app.get('/chat_history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const history = conversationHistory.get(sessionId) || [];
    res.json({ history, sessionId });
  } catch (err) {
    console.error('Error getting chat history:', err);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

// Clear conversation history for a session
app.delete('/chat_history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    conversationHistory.delete(sessionId);
    res.json({ message: 'Conversation history cleared', sessionId });
  } catch (err) {
    console.error('Error clearing chat history:', err);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

app.listen(5002, () => {
  console.log('AI Chatbot backend listening on port 5002');
}); 