const express = require('express');
const db = require('../db/db');
const { feedbackInputSchema } = require('../llm/schema');
const { analyzeFeedback } = require('../llm/client');
const { clearCache } = require('./reports'); // We will import clearCache from reports

const router = express.Router();

router.post('/', async (req, res) => {
  const parseResult = feedbackInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid input", details: parseResult.error.issues });
  }

  const { text } = parseResult.data;

  try {
    // 1. Send to LLM
    const analysis = await analyzeFeedback(text);
    
    // 2. Save to DB
    const insert = db.prepare(`
      INSERT INTO feedback (raw_text, category, urgency, sentiment) 
      VALUES (?, ?, ?, ?)
    `);
    
    const result = insert.run(text, analysis.category, analysis.urgency, analysis.sentiment);
    
    // 3. Clear the reports cache since new data arrived
    clearCache();

    return res.status(201).json({ 
      id: result.lastInsertRowid,
      text,
      ...analysis
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
