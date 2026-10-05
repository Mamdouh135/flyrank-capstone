const db = require('./src/db/db');

console.log("Seeding Database...");

const seedData = [
  { text: "My card was charged twice! I need a refund immediately.", cat: "billing", urg: "critical", sent: "negative" },
  { text: "The app is fantastic, really helped our team.", cat: "praise", urg: "low", sent: "positive" },
  { text: "I can't log in, it just keeps spinning.", cat: "bug", urg: "high", sent: "negative" },
  { text: "Could you add a dark mode? It hurts my eyes.", cat: "feature", urg: "normal", sent: "neutral" },
  { text: "Is there a discount for students?", cat: "billing", urg: "normal", sent: "neutral" },
];

const insert = db.prepare(`INSERT INTO feedback (raw_text, category, urgency, sentiment) VALUES (?, ?, ?, ?)`);

db.transaction(() => {
  for (const item of seedData) {
    insert.run(item.text, item.cat, item.urg, item.sent);
  }
})();

console.log(`✅ Seeded ${seedData.length} records!`);
