// middleware/errorMiddleware.js
const globalErrorHandler = (err, req, res, next) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ message: "Something went wrong" });
};

module.exports = {
  globalErrorHandler,
};
