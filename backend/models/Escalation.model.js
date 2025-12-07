const mongoose = require("mongoose");

const EscalationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    unresolvedQuery: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      default: "Support Agent",
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Escalation", EscalationSchema);
