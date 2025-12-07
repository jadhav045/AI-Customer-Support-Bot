const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const Session = require("../models/Session.model");
const { getOrCreateSession } = require("../services/memory.service");

/**
 * Creates a new session or returns existing session
 */
exports.createSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ApiError(400, "sessionId is required");
  }

  const session = await getOrCreateSession(sessionId);

  res.status(201).json({
    success: true,
    session,
  });
});

/**
 * Fetch session history
 */
exports.getSession = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const session = await Session.findOne({ sessionId: id });

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  res.status(200).json({
    success: true,
    session,
  });
});
