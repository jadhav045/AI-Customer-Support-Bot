const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const { findBestFAQMatch } = require("../services/faq.service");
const {
  getOrCreateSession,
  addUserMessage,
  addBotMessage,
} = require("../services/memory.service");
const { generateAIAnswer } = require("../services/llm.service");
const { escalateQuery } = require("../services/escalation.service");

const FAQ_MATCH_THRESHOLD = parseFloat(
  process.env.FAQ_MATCH_THRESHOLD || "0.6"
);
const FAQ_ESCALATION_THRESHOLD = parseFloat(
  process.env.FAQ_ESCALATION_THRESHOLD || "0.2"
);

/**
 * Handles user query:
 * 1. Stores user message in session
 * 2. Attempts FAQ match (embedding-based)
 * 3. If confident match → return FAQ answer
 * 4. Else → call LLM for AI-generated answer
 * 5. If match score is very low → also trigger escalation simulation
 */
exports.handleQuery = asyncHandler(async (req, res) => {
  const { sessionId, query } = req.validated;

  // Ensure session & log user message
  await getOrCreateSession(sessionId);
  await addUserMessage(sessionId, query);

  // Try FAQ match
  const { faq, score } = await findBestFAQMatch(query);

  let botResponse;
  let escalated = false;

  if (faq && score >= FAQ_MATCH_THRESHOLD) {
    // Good FAQ match → use direct answer
    botResponse = faq.answer;
  } else {
    // No good FAQ match → ask LLM
    const aiResult = await generateAIAnswer(query);
    botResponse = aiResult.answer;

    // If FAQ score is extremely low, simulate escalation
    if (!faq || score <= FAQ_ESCALATION_THRESHOLD) {
      await escalateQuery(sessionId, query);
      escalated = true;
    }
  }

  // Store bot response in session
  await addBotMessage(sessionId, botResponse);

  res.status(200).json({
    success: true,
    query,
    matchScore: score,
    usedFAQ: Boolean(faq && score >= FAQ_MATCH_THRESHOLD),
    escalated,
    botResponse,
  });
});
