const express = require('express');
const db = require('../db/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory cache
let reportCache = {
  data: null,
  timestamp: 0
};

const CACHE_TTL = 60 * 1000; // 60 seconds

function clearCache() {
  reportCache.data = null;
  reportCache.timestamp = 0;
}

router.get('/', requireAuth, (req, res) => {
  const now = Date.now();
  
  // Return cached result if valid
  if (reportCache.data && (now - reportCache.timestamp < CACHE_TTL)) {
    return res.status(200).json({
      cached: true,
      data: reportCache.data
    });
  }

  try {
    // Expensive aggregate queries
    const totalCount = db.prepare(`SELECT count(*) as count FROM feedback`).get().count;
    
    const categoryStats = db.prepare(`
      SELECT category, count(*) as count 
      FROM feedback 
      GROUP BY category
    `).all();
    
    const urgentBugs = db.prepare(`
      SELECT id, raw_text, sentiment, created_at 
      FROM feedback 
      WHERE category = 'bug' AND urgency IN ('high', 'critical')
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();

    const report = {
      total_feedback: totalCount,
      categories: categoryStats,
      top_urgent_bugs: urgentBugs
    };

    // Update cache
    reportCache = {
      data: report,
      timestamp: now
    };

    return res.status(200).json({
      cached: false,
      data: report
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
});

module.exports = { router, clearCache };
