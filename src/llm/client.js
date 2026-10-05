const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const { feedbackOutputSchema } = require('./schema');

const client = new OpenAI({
  baseURL: process.env.LLM_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.LLM_API_KEY,
  timeout: 30000,
  maxRetries: 1
});

function getPrompt() {
  const promptPath = path.join(__dirname, '../../prompts/feedback-v1.md');
  return fs.readFileSync(promptPath, 'utf8');
}

function extractJSON(text) {
  let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  const start = cleanText.indexOf('{');
  const end = cleanText.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    cleanText = cleanText.substring(start, end + 1);
  }
  return JSON.parse(cleanText);
}

async function analyzeFeedback(text) {
  // Stub Mode for Testing
  if (process.env.LLM_STUB === '1') {
    return { category: 'bug', urgency: 'high', sentiment: 'negative' };
  }

  const systemPrompt = getPrompt();
  
  let messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: JSON.stringify({ text }) }
  ];

  try {
    const response = await client.chat.completions.create({
      model: process.env.LLM_MODEL || 'openrouter/free',
      messages,
      temperature: 0.1,
    });
    
    const rawText = response.choices[0].message.content;
    const rawJson = extractJSON(rawText);
    return feedbackOutputSchema.parse(rawJson);
  } catch (error) {
    console.error("LLM Error:", error.message);
    throw new Error("Failed to analyze feedback");
  }
}

module.exports = { analyzeFeedback };
