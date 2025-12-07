const { z } = require("zod");

const QuerySchema = z.object({
  sessionId: z.string().min(3, "Session ID required"),
  query: z.string().min(1, "Query cannot be empty"),
});

const validateQuery = (req, res, next) => {
  try {
    req.validated = QuerySchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      details: error.errors,
    });
  }
};

module.exports = validateQuery;
