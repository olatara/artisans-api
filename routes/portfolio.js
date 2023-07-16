const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const portfolioController = require("../controllers/portfolioController");

// Use the file upload middleware for the specific route
router.post("/", fileUpload, portfolioController.createPortfolio);

router.patch("/:id", fileUpload, portfolioController.updatePortfolio);

router.delete("/:id", portfolioController.addPortfolioImages);

module.exports = router;
