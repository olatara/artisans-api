const knex = require("knex");
const knexConfig = require("../knexfile");
const imageUtils = require("../utilities/imageUtils");
const db = knex(knexConfig.development);

const addPortfolioImages = async (req, res) => {
  const { id } = req.params;
  const { files } = req;

  // Check if files are provided
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
    // Update the tradesperson's portfolio_photos with the new image URLs
    await db("portfolio")
      .where({ tradesperson_id: id })
      .update({ photos: JSON.stringify(imageUrls) });

    res.send({ message: "Portfolio images added", tradespersonId: id });
  } catch (error) {
    res.status(500).send({ message: "Error adding portfolio images", error });
  }
};

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
  deletePortfolioImages,
};
