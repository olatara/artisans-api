// tradespersonController.js
const knex = require('knex');
const knexConfig = require('../knexfile');
const { validateProfession } = require('../utilities/validationUtils');
const imageUtils = require('../utilities/imageUtils');

const db = knex(knexConfig.development);

// Get all tradespersons
const getAllTradespersons = async (req, res) => {
  try {
    const tradespersons = await db('tradespersons').select('*');
    res.send({ tradespersons });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving tradespersons', error });
  }
};

// Get a tradesperson by ID
const getTradespersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const tradesperson = await db('tradespersons').where({ id }).first();
    if (!tradesperson) {
      res.status(404).send({ message: 'Tradesperson not found' });
    } else {
      res.send({ tradesperson });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving tradesperson', error });
  }
};

// Create a new tradesperson
const createTradesperson = async (req, res) => {
  const { body } = req;
  const { name, profession, email, phone, bio } = body;


  // Check if the provided profession is valid
  if (!validateProfession(profession)) {
    return res.status(400).json({ error: 'Invalid profession' });
  }

  try {
    const newTradesperson = await db('tradespersons')
      .insert({ 
        name, 
        profession, 
        email, 
        phone, 
        bio,
      });
    res.send({ message: 'Tradesperson created', tradesperson: newTradesperson });
  } catch (error) {
    res.status(500).send({ message: 'Error creating tradesperson', error });
  }
};

// Update a tradesperson by ID
const updateTradespersonById = async (req, res) => {
  const { id } = req.params;
  const { name, profession, email, phone, bio, } = req.body;

  try {
    const updatedTradesperson = await db('tradespersons')
      .where({ id })
      .update({ 
        name, 
        profession, 
        email, 
        phone, 
        bio,
      });

    if (updatedTradesperson === 0) {
      res.status(404).send({ message: 'Tradesperson not found' });
    } else {
      res.send({ message: 'Tradesperson updated', tradespersonId: id });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating tradesperson', error });
  }
};

// Delete a tradesperson by ID
const deleteTradespersonById = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve tradesperson data to get the portfolio_photos field
    const tradesperson = await db('tradespersons').where({ id }).first();

    if (!tradesperson) {
      return res.status(404).send({ message: 'Tradesperson not found' });
    }

    // Delete the tradesperson from the database
    const deletedTradesperson = await db('tradespersons').where({ id }).del();

    // Delete Trades person portfolio too. 

    res.send({ message: 'Tradesperson deleted', tradespersonId: id });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting tradesperson', error });
  }
};

const addPortfolioImages = async (req, res) => {
  const { id } = req.params;
  const { files } = req;

  // Check if files are provided
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: 'No images provided' });
  }

  try {
    // Upload images and get their URLs
    const imageUrls = await Promise.all(
      files.map((file) => imageUtils.uploadImageToStorage(file, 'portfolio_images'))
    );
    // Update the tradesperson's portfolio_photos with the new image URLs
    await db('portfolio')
      .where({ tradesperson_id: id })
      .update({ photos: JSON.stringify(imageUrls) });

    res.send({ message: 'Portfolio images added', tradespersonId: id });
  } catch (error) {
    res.status(500).send({ message: 'Error adding portfolio images', error });
  }
};

const deletePortfolioImages = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await db('portfolio')
      .where({ tradesperson_id: id })
      .first();

    if (portfolio && portfolio.photos) {
      const imageUrls = JSON.parse(portfolio.photos);
      await Promise.all(imageUrls.map(imageUtils.deleteImageFromStorage));

      // Clear the photos field in the portfolio record
      await db('portfolio')
        .where({ tradesperson_id: id })
        .update({ photos: null });

      res.send({ message: 'Portfolio images deleted', tradespersonId: id });
    } else {
      res.status(404).send({ message: 'Tradesperson not found or no portfolio images found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting portfolio images', error });
  }
};



module.exports = {
  getAllTradespersons,
  getTradespersonById,
  createTradesperson,
  updateTradespersonById,
  deleteTradespersonById,
  addPortfolioImages,
  deletePortfolioImages
};
