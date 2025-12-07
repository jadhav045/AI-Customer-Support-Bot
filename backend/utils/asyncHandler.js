/**
 * Wraps async route handlers and forwards errors to Express error middleware.
 *
 * @param {Function} fn - Async route handler (req, res, next) => Promise
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
