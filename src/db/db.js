const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../feedback.db');
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    raw_text TEXT NOT NULL,
    category TEXT NOT NULL,
    urgency TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
