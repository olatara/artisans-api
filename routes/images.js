const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");
const imagesController = require("../controllers/imagesController");

// MOVE THESE TO OWN ROUTER FILE
// Use the file upload middleware for the specific route
router.post("/upload", fileUpload, imagesController.addPortfolioImages);

module.exports = router;
