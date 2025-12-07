const Session = require("../models/Session.model");

/**
 * Creates or fetches an existing session.
 */
const getOrCreateSession = async (sessionId) => {
  let session = await Session.findOne({ sessionId });

  if (!session) {
    session = await Session.create({
      sessionId,
      userMessages: [],
      botMessages: [],
    });
  }

  return session;
};

/**
 * Stores a user message in a session.
 */
const addUserMessage = async (sessionId, message) => {
  const session = await getOrCreateSession(sessionId);

  session.userMessages.push({ message, timestamp: new Date() });
  session.lastInteraction = new Date();

  await session.save();
  return session;
};

/**
 * Stores a bot message in a session.
 */
const addBotMessage = async (sessionId, message) => {
  const session = await getOrCreateSession(sessionId);

  session.botMessages.push({ message, timestamp: new Date() });
  session.lastInteraction = new Date();

  await session.save();
  return session;
};

module.exports = {
  getOrCreateSession,
  addUserMessage,
  addBotMessage,
};
