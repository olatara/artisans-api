const knex = require("knex");
const knexConfig = require("../knexfile");
const imageUtils = require("../utilities/imageUtils");
const env = process.env.NODE_ENV || "development";
const db = knex(knexConfig[env]);

const createPortfolio = async (req, res) => {
  const { tradespersonId: tradesperson_id } = req.params;
  const { name, description } = req.body;
  const { files } = req;
  // validate portfolio request

  try {
    const images = await addPortfolioImages(files, tradesperson_id);

    // Update the tradesperson's portfolio_photos with the new image URLs
    const newPortfolio = {
      tradesperson_id,
      name,
      description,
      photos: JSON.stringify(images),
    }

    await db("portfolio").insert(newPortfolio);

    res.send({ message: "Portfolio images added", newPortfolio});
  } catch (error) {
    res.status(500).send({ message: "Error creating portfolio", error });
  }
};

const updatePortfolio = async (req, res) => {
  const { tradespersonId } = req.params;
  const { name, description } = req.body;
  const { files } = req;

  // Validate portfolio request (you can define a separate function for validation)

  try {
    // Get the tradesperson's current portfolio
    const portfolio = await getTradespersonPortfolio(tradespersonId);

    if (portfolio.length === 0) {
      res.status(404).send({ message: "Portfolio not found" });
    }

    // Retrieve the list of current image URLs from the portfolio in the database
    const currentImages = portfolio.photos ? JSON.parse(portfolio.photos) : [];

    // Get new images file names
    const newImages = await Promise.all(
      files.map((image) => image.originalname)
    );

    const { 
      imagesToAddNames, 
      imagesToDelete 
    } = compareImages(currentImages, newImages);

    const filesToAdd = files.filter(
      (image) => imagesToAddNames.includes(image.originalname)
    );

    // Delete the images from GCP storage
    await Promise.all(
      imagesToDelete.map((image) =>
        imageUtils.deleteImageFromStorage(image)
      )
    );

    // Add the new images to GCP storage
    const imageUrls = addPortfolioImages(filesToAdd);

    // Update the tradesperson's portfolio in the database
    await db("portfolio")
      .where({ tradesperson_id: tradespersonId })
      .update({
        name,
        description,
        photos: JSON.stringify(imageUrls),
      });

    res.send({ message: "Portfolio updated", tradespersonId });
  } catch (error) {
    res.status(500).send({ message: "Error updating portfolio", error });
  }
};


const compareImages = (currentImages, newImages) => {
  const imagesToAdd = newImages.filter((image) => !currentImages.includes(image));
  const imagesToDelete = currentImages.filter((image) => !newImages.includes(image));
  return { imagesToAdd, imagesToDelete };
}

const addPortfolioImages = async (files, tradespersonId) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "No images provided" });
  }

  try {
    // Upload images and get their URLs
    const imageUrls = await Promise.all(
      files.map((file) =>
        imageUtils.uploadImageToStorage(file, "portfolio_images", tradespersonId)
      )
    );
    return imageUrls;
  } catch (error) {
    throw new Error("Error adding portfolio images");
  }
};

const getTradespersonPortfolio = async (tradespersonId) => {
  // Retrieve the tradesperson's portfolio by tradesperson ID
  const portfolio = await db("portfolio")
    .where({ tradesperson_id: tradespersonId })
    .first();
  return portfolio;
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
  createPortfolio,
  updatePortfolio,
  deletePortfolioImages,
};
