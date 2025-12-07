require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const {
  notFoundHandler,
  globalErrorHandler,
} = require("./middleware/errorHandler");

// In future batches we will add:
const queryRoutes = require("./routes/query.routes");
const sessionRoutes = require("./routes/session.routes");
const escalationRoutes = require("./routes/escalation.routes");

const app = express();

// --------- Basic Middleware ---------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --------- Health Check Route ---------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Customer Support Bot API is running",
    timestamp: new Date().toISOString(),
  });
});

// --------- Placeholder Routes (will be implemented in next batches) ---------
app.use("/api/query", queryRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/escalation", escalationRoutes);

// --------- Error Handling Middlewares ---------
app.use(notFoundHandler);
app.use(globalErrorHandler);

// --------- Server Start ---------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
