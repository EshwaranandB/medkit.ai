const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const initialPrompt = `IMPORTANT: Do NOT include any internal thoughts, reasoning, or step-by-step analysis. Only output the final summary and instructions for the patient. If you include anything else, your response will be discarded.

You are a helpful medical assistant. Given the following image of a prescription or medical report, output ONLY a clear, patient-friendly summary. For each medication, list:
- Name
- Purpose
- Dosage and frequency
- Key warnings or side effects (if any)

Then, provide simple next steps for the patient. Do NOT include your reasoning, step-by-step thoughts, or any meta-analysis. Do NOT mention what you are doing or how you are analyzing. Only output the summary and instructions for the patient in plain language.`;

// Add a filter to remove LLM meta-analysis and 'thinking' from the output
function filterLLMResponse(text) {
  // Remove blocks between ◁think▷ and ◁/think▷ (non-greedy)
  let filtered = text.replace(/◁think▷[\s\S]*?◁\/think▷/g, '');
  // Remove lines starting with meta-analysis phrases
  filtered = filtered
    .split('\n')
    .filter(line =>
      !line.trim().toLowerCase().startsWith('okay,') &&
      !line.trim().toLowerCase().startsWith('first,') &&
      !line.trim().toLowerCase().startsWith('next,') &&
      !line.trim().toLowerCase().startsWith('looking at') &&
      !line.trim().toLowerCase().startsWith('i need to') &&
      !line.trim().toLowerCase().startsWith('check if') &&
      !line.trim().toLowerCase().startsWith("let's tackle")
    )
    .join('\n');
  return filtered.trim();
}

app.post('/analyze_prescription', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  try {
    const imagePath = path.join(__dirname, req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    const base64url = `data:image/jpeg;base64,${base64String}`;

    const messages = [
      {
        role: 'user',
        content: [
          { type: 'text', text: initialPrompt },
          { type: 'image_url', image_url: { url: base64url } }
        ]
      }
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'moonshotai/kimi-vl-a3b-thinking:free',
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // Optional site URL
          'X-Title': 'Medkit.AI', // Optional site title
        },
      }
    );

    // After getting the LLM response
    let analysis = response.data.choices[0].message.content;
    analysis = filterLLMResponse(analysis);

    fs.unlinkSync(imagePath); // Clean up uploaded file
    res.send(analysis);
  } catch (err) {
    console.error('Error in /analyze_prescription:', err); // Log error to terminal
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to analyze prescription', details: err.message });
  }
});

// Add chat assistant endpoint for AI chatbot
app.post('/chat_assistant', express.json(), async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages,
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
    res.json({ reply });
  } catch (err) {
    console.error('Error in /chat_assistant:', err);
    res.status(500).json({ error: 'Failed to get AI response', details: err.message });
  }
});

app.listen(5001, () => {
  console.log('Prescription backend running on http://localhost:5001');
}); 