const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const initialPrompt = `## YOUR TASK

- Analyze the following given image of a doctor's prescription or a medical report.
- In response Please provide a clear and simple explanation of the medications prescribed that can be easily understood by a patient. 
- Also provide a guide on what they should do next.
- Do highlight any important information mentioned in the report or prescription.
- Ensure that the explanation is general and harmless.
- If medications are given in the given image then give a detailed explanation of each medication for eg. Dosage, Purpose, Frequency, Side effects, etc.
- In the output firstly provide what is the report about then provide the important things that the patient should know about the report/prescription and then provide the explanation of the medications prescribed and lastly give a summary.
- If the given image is not a prescription or report then give a response that the given image is not a prescription or report.
- Give detailed and clear response that can be easily understood by a patient.
`;

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
        role: 'system',
        content: 'You are a helpful Medical Assistant who is assisting a patient with understanding their doctor\'s prescription/reports.',
      },
      {
        role: 'user',
        content: initialPrompt + base64url,
      },
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    fs.unlinkSync(imagePath); // Clean up uploaded file
    res.send(response.data.choices[0].message.content);
  } catch (err) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to analyze prescription', details: err.message });
  }
});

app.listen(5001, () => {
  console.log('Prescription backend running on http://localhost:5001');
}); 