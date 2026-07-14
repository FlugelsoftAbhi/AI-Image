require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
  }

  try {
    const systemInstruction = "You are a master prompt engineer for text-to-image AI models. Expand the user's input into a highly detailed, descriptive visual prompt optimized for stable diffusion style models. Output ONLY the optimized prompt text. Do not include markdown formatting, introductions, or pleasantries.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const refinedPrompt = response.text;

    // URL encode the refined prompt
    const encodedPrompt = encodeURIComponent(refinedPrompt.trim());
    
    // Generate a random seed to ensure uniqueness per request
    const seed = Math.floor(Math.random() * 100000);

    // Construct the Pollinations URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&enhance=true&nologo=true&seed=${seed}`;

    res.json({
      refinedPrompt,
      imageUrl,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to process request and generate image' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
