// tradespersonController.js
const knex = require('knex');
const knexConfig = require('../knexfile');

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
  const { name, profession, email, phone, bio, } = req.body;

  try {
    const newTradesperson = await db('tradespersons')
      .insert({ 
        name, 
        profession, 
        email, 
        phone, 
        bio 
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
    const deletedTradesperson = await db('tradespersons').where({ id }).del();
    if (deletedTradesperson === 0) {
      res.status(404).send({ message: 'Tradesperson not found' });
    } else {
      res.send({ message: 'Tradesperson deleted', tradespersonId: id });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting tradesperson', error });
  }
};

module.exports = {
  getAllTradespersons,
  getTradespersonById,
  createTradesperson,
  updateTradespersonById,
  deleteTradespersonById,
};
