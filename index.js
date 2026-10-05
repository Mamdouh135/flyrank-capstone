require('dotenv').config();
const express = require('express');
const feedbackRouter = require('./src/routes/feedback');
const { router: reportsRouter } = require('./src/routes/reports');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/feedback', feedbackRouter);
app.use('/reports', reportsRouter);

app.listen(PORT, () => {
  console.log(`✅ FeedbackFlow AI running on http://localhost:${PORT}`);
});
