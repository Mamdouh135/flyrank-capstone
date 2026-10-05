# My 10x Solution - Intern

## 1. The Problem
Product managers and customer success teams spend hours every week reading hundreds of raw customer feedback messages across different channels. It is extremely tedious to manually figure out which messages are urgent bug reports, which are feature requests, and what the overall sentiment is. Important product signals are often lost in the noise.

## 2. Who has this problem
Product Managers, Customer Support Leads, and Founders who need to prioritize what to build or fix next based on user feedback, but lack the time to read every single message.

## 3. The 10x Claim
**FeedbackFlow AI** makes processing customer feedback ten times faster by automatically categorizing and scoring the urgency of every incoming message using an LLM, and instantly providing cached aggregate reports. What used to take hours of manual reading now takes a 5-second glance at a dashboard.

## 4. The 5 Concepts
1. **API Endpoints:** A structured Express API with validation (e.g., `POST /feedback`, `GET /reports`).
2. **Database:** SQLite persistence so feedback data and LLM analysis survive restarts.
3. **Authentication:** Supabase JWT verification to ensure only authorized staff can access the `/reports` endpoint.
4. **LLM Integration:** OpenRouter (OpenAI SDK) integration with Zod schema validation to extract `category`, `urgency`, and `sentiment` from unstructured text.
5. **Caching logic:** In-memory caching for the `/reports` endpoint to prevent expensive database aggregate queries on every request.

## 5. Non-goal
I will **NOT** build a frontend dashboard UI or mobile app. The system will operate purely as a backend REST API.
