/**
 * Final Express error handler. Express 5 forwards errors thrown in async
 * route handlers here automatically.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message]),
    );
    return res.status(400).json({ message: "Validation failed", errors });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `That ${field} is already in use` });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body is not valid JSON" });
  }

  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};
