const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const tradespersonController = require("../controllers/tradespersonController");
const portfolioController = require("../controllers/portfolioController");


// GET all tradespersons
router.get("/", tradespersonController.getAllTradespersons);

// GET tradesperson by ID
router.get("/:id", tradespersonController.getTradespersonById);

// POST create a new tradesperson
router.post("/", tradespersonController.createTradesperson);

// PUT update tradesperson by ID
router.put("/:id", tradespersonController.updateTradespersonById);

// DELETE tradesperson by ID
router.delete("/:id", tradespersonController.deleteTradespersonById);


// Use the file upload middleware for the specific route
// router.post("/:id/portfolio", fileUpload, portfolioController.createPortfolio);

module.exports = router;
