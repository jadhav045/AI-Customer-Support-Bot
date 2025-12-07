const mongoose = require("mongoose");

/**
 * Connects to MongoDB using MONGODB_URI from environment variables.
 * Exits the process if connection fails.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Options left minimal; Mongoose 6+ handles defaults well
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Optional: detailed error logging in debug mode
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
