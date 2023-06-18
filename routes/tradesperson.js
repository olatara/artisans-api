const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');
const tradespersonController = require('../controllers/tradespersonController');

// GET all tradespersons
router.get('/', tradespersonController.getAllTradespersons);

// GET tradesperson by ID
router.get('/:id', tradespersonController.getTradespersonById);

// POST create a new tradesperson
router.post('/', tradespersonController.createTradesperson);

// PUT update tradesperson by ID
router.put('/:id', tradespersonController.updateTradespersonById);

// DELETE tradesperson by ID
router.delete('/:id', tradespersonController.deleteTradespersonById);


// MOVE THESE TO OWN ROUTER FILE
// Use the file upload middleware for the specific route
router.post('/upload', fileUpload, tradespersonController.addPortfolioImages);

module.exports = router;
