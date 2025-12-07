const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const { escalateQuery } = require("../services/escalation.service");
const Session = require("../models/Session.model");

/**
 * Force escalation manually
 */
exports.triggerEscalation = asyncHandler(async (req, res) => {
  const { sessionId, query } = req.body;

  if (!sessionId || !query) {
    throw new ApiError(400, "sessionId and query are required");
  }

  const session = await Session.findOne({ sessionId });
  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  const result = await escalateQuery(sessionId, query);

  res.status(200).json({
    success: true,
    message: "Escalation triggered",
    result,
  });
});
