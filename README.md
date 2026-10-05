# FeedbackFlow AI

This is a **Capstone Project** for the Backend Track. It solves the problem of product managers spending hours reading and categorizing raw customer feedback.

## The 5 Concepts Implemented

| Concept | Where it lives in the code |
|---------|----------------------------|
| 1. API Endpoints | `src/routes/feedback.js` & `src/routes/reports.js` |
| 2. Database | `src/db/db.js` (SQLite) |
| 3. Authentication | `src/middleware/auth.js` (Supabase JWT) |
| 4. LLM Integration | `src/llm/client.js` & `src/llm/schema.js` (OpenRouter + Zod) |
| 5. Caching Logic | `src/routes/reports.js` (In-memory caching for expensive aggregates) |

## How to run it (in 5 minutes)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment:**
   Rename `.env.example` to `.env` and fill in your OpenRouter API key and Supabase JWT Secret.
3. **Seed demo data:**
   ```bash
   node seed.js
   ```
4. **Start the server:**
   ```bash
   node index.js
   ```

## Demo Path

1. **Submit new feedback (LLM powered):**
   ```bash
   curl -X POST http://localhost:3000/feedback \
     -H "Content-Type: application/json" \
     -d '{"text":"The new PDF export feature is completely broken, giving me a blank page!"}'
   ```
   *Notice it will automatically categorize as `bug`, urgency `critical`, sentiment `negative`.*

2. **View the Aggregate Report (Requires JWT Auth):**
   ```bash
   curl -X GET http://localhost:3000/reports \
     -H "Authorization: Bearer YOUR_SUPABASE_JWT_TOKEN"
   ```
   *Notice the JSON returns `"cached": false` on the first call, and `"cached": true` if you hit it again within 60 seconds.*
