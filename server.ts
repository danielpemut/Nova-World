/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header guidance
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    if (!geminiApiKey) {
      console.warn('Warning: GEMINI_API_KEY environment variable is not set. AI Chat fallback mode activated.');
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Chat Counselor - handles properties matching, material calculation, equipment recommendations, loan explanations
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages parameter' });
    }

    const ai = getAiClient();
    
    if (!ai) {
      // Return a simulated high-quality mock construction advisor response if no key is configured yet
      return res.json({
        text: "Thank you for contacting Nova Construction Support. Deep integration with our Gemini Technical Engine requires a valid GEMINI_API_KEY which can be configured inside the Settings panel. I am here to help guide you on our machinery fleet, land development options, materials inventory, and custom loan ratios!",
        fallback: true
      });
    }

    // Build the payload for generateContent
    // Generate context for the prompt
    const systemPrompt = `You are "Nova Construction Professional Advisor", an expert AI consultant for Nova Construction.
Nova Construction specializes in:
1. Premier commercial real estate (e.g., Nova Apex Commercial Tower, Vanguard Logistic Warehouses) and prime development lands.
2. Construction heavy machinery rentals and sales, featuring modern excavator fleets, Schwing concrete pumps, Volvo dump trucks, and tower cranes.
3. Raw construction materials supply including Grade 52.5N Portland cement, ASTM steel rebars, timber lumber, and aggregate bases.
4. Dynamic financial loan structures for land acquisition, machinery lease, development, and commercial mortgages (recommending terms of 5 to 30 years and comparing credit index thresholds).

Your tone is strictly professional, highly technical, helpful, and concise.
Answer technical civil engineering and loan planning questions intelligently (e.g., concrete strength ratings, soil load capacities, interest rates calculating, machinery dimensions).
Refer to properties, equipment or materials in Nova Construction database when relevant, according to this current catalog metadata:
${JSON.stringify(context || {})}

Always format your response with clean markdown headings and lists where appropriate. Keep responses under 250 words. Do not make up prices outside our catalog but offer customized estimates.`;

    // Map the incoming chat messages to Gemini's expected contents structure
    const mappedContents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: mappedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const responseText = response.text || 'I apologies, I was unable to construct a response. Please let me know how I can help you with your project grading, machinery rentals, or loans.';

    res.json({ text: responseText, fallback: false });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to query the AI Construction Advisor', 
      details: error.message || error 
    });
  }
});

// Handle custom inquiry emails submissions (mocked in-memory store log)
const inquiries: any[] = [];
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, message, itemType, itemId, itemName } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    message,
    itemType: itemType || 'general',
    itemId: itemId || null,
    itemName: itemName || null,
    submittedAt: new Date().toISOString()
  };
  inquiries.push(newInquiry);
  console.log('New Inquiry Received:', newInquiry);
  res.json({ success: true, inquiry: newInquiry });
});

// Handle custom loan applications submissions (mocked in-memory store log)
const loanApplications: any[] = [];
app.post('/api/loans', (req, res) => {
  const application = req.body;
  if (!application.fullName || !application.email || !application.loanAmount) {
    return res.status(400).json({ error: 'Full name, email, and loan amount are required' });
  }
  const newApplication = {
    id: `loan-${Date.now()}`,
    ...application,
    submittedAt: new Date().toISOString()
  };
  loanApplications.push(newApplication);
  console.log('New Loan Application Received:', newApplication);
  res.json({ success: true, application: newApplication });
});

// Vite Middleware for Development / Static Asssets for Production
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev middleware attached.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static files from dist directory.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nova Construction Full-Stack server is operational on port ${PORT}`);
  });
}

setupViteOrStatic();
