const knex = require("knex");
const knexConfig = require("../knexfile");
const imageUtils = require("../utilities/imageUtils");
const env = process.env.NODE_ENV || "development";
const db = knex(knexConfig[env]);

const createPortfolio = async (req, res) => {
  const { tradespersonId } = req.params;
  const { name, description } = req.body;
  const { files } = req;
  // validate portfolio request

  // insert images into google storage
  // : returns ['urls']

  // insert request, and image urls array into the portfolio table.

  try {
    const images = addPortfolioImages(files);

    // Update the tradesperson's portfolio_photos with the new image URLs
    await db("portfolio").insert({
      name,
      description,
      photos: JSON.stringify(images),
    });

    res.send({ message: "Portfolio images added", tradespersonId: id });
  } catch (error) {
    res.status(500).send({ message: "Error adding portfolio images", error });
  }
};

const updatePortfolio = async (req, res) => {
  // validate portfolio request -
  // get images from cloud
  // update gcp = insert/ delete new/ old images
  // insert images into google storage
  // : returns ['urls']
  // insert and image urls array into the portfolio table.
  try {
    await db("portfolio")
      .where({
        tradesperson_id: tradespersonId,
        description,
      })
      .update({
        name,
        photos: JSON.stringify(images),
      });
  } catch (error) {}
};

const addPortfolioImages = async (files) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "No images provided" });
  }

  try {
    // Upload images and get their URLs
    const imageUrls = await Promise.all(
      files.map((file) =>
        imageUtils.uploadImageToStorage(file, "portfolio_images")
      )
    );
    return imageUrls;
  } catch (error) {
    throw new Error("Error adding portfolio images");
  }
};

// tradesperson -> Portfolio -> images

const deletePortfolioImages = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await db("portfolio")
      .where({ tradesperson_id: id })
      .first();

    if (portfolio && portfolio.photos) {
      const imageUrls = JSON.parse(portfolio.photos);
      await Promise.all(imageUrls.map(imageUtils.deleteImageFromStorage));

      // Clear the photos field in the portfolio record
      await db("portfolio")
        .where({ tradesperson_id: id })
        .update({ photos: null });

      res.send({ message: "Portfolio images deleted", tradespersonId: id });
    } else {
      res.status(404).send({
        message: "Tradesperson not found or no portfolio images found",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting portfolio images", error });
  }
};

module.exports = {
  addPortfolioImages,
  createPortfolio,
  updatePortfolio,
  deletePortfolioImages,
};
