const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    userMessages: [
      {
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    botMessages: [
      {
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    escalationStatus: {
      type: Boolean,
      default: false,
    },

    lastInteraction: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", SessionSchema);
