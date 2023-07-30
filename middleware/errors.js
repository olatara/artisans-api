const errorMiddleware = (error, req, res, next) => {
  // Multer errors
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size exceeds the limit" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "Too many files uploaded" });
    }
    // Handle other Multer errors if needed
    return res.status(500).json({ message: "Other Error with Multer" + error });
  }

  // Handle other errors
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
};

module.exports = errorMiddleware;
