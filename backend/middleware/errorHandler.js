const ApiError = require("../utils/apiError");

/**
 * 404 handler for unknown routes.
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};

/**
 * Global error-handling middleware.
 * Ensures a clean, consistent JSON response for all errors.
 */
/* eslint-disable no-unused-vars */
const globalErrorHandler = (err, req, res, next) => {
  // If error is not an instance of ApiError, wrap it
  let error = err;
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    error = new ApiError(statusCode, message);
  }

  const statusCode = error.statusCode || 500;

  const response = {
    success: false,
    message: error.message || "Internal Server Error",
  };

  if (error.details) {
    response.details = error.details;
  }

  // Show stack only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};
/* eslint-enable no-unused-vars */

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};
