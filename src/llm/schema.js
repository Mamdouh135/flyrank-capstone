const { z } = require('zod');

const feedbackInputSchema = z.object({
  text: z.string().min(10).max(2000)
});

const feedbackOutputSchema = z.object({
  category: z.enum(['bug', 'feature', 'billing', 'praise', 'other']),
  urgency: z.enum(['low', 'normal', 'high', 'critical']),
  sentiment: z.enum(['positive', 'neutral', 'negative'])
});

module.exports = {
  feedbackInputSchema,
  feedbackOutputSchema
};
