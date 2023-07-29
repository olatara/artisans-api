const port = process.env.PORT || 3000;

const express = require("express");
const { json, urlencoded } = require("express");
const responseFormatter = require("./middleware/response");
const tradespersonRoutes = require("./routes/tradesperson");
const availabilityRoutes = require("./routes/availability");
const portfolioRoutes = require("./routes/portfolio");
const errorMiddleware = require("./middleware/errors");
const config = require("./config");

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Error handling middleware
app.use(errorMiddleware);
app.use(responseFormatter);

// Routes

app.use("/api/tradesperson/:tradespersonId/portfolio", portfolioRoutes);
app.use("/api/tradesperson", tradespersonRoutes);
app.use("/api/availability", availabilityRoutes);

// GET /api/tradesperson/:tid/porfolio/:id

// Routes
app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

// Database connection example
const dbConfig = config.database;
// Replace this example with your actual database connection logic

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
