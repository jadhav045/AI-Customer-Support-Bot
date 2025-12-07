const Escalation = require("../models/Escalation.model");
const Session = require("../models/Session.model");

/**
 * Triggers escalation for a session.
 */
const escalateQuery = async (sessionId, unresolvedQuery) => {
  const escalation = await Escalation.create({
    sessionId,
    unresolvedQuery,
    assignedTo: "Support Team",
  });

  await Session.updateOne({ sessionId }, { $set: { escalationStatus: true } });

  return escalation;
};

module.exports = {
  escalateQuery,
};
