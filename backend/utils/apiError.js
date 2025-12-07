/**
 * Custom API Error class for consistent error handling.
 * Includes HTTP status code and optional additional details.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Human-readable error message
   * @param {object} [details] - Optional extra info (validation errors, etc.)
   */
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Helpful flag for logging

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
