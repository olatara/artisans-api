const { Storage } = require("@google-cloud/storage");
const config = require("../config");

const storage = new Storage({
  projectId: config.gcp.images.projectId,
  keyFilename: config.gcp.images.keyFilename,
});

async function uploadImageToStorage(image, bucketKey, tradespersonId) {
  const bucketName = config.gcp.images.buckets[bucketKey]; // Replace with your bucket name for portfolio images
  const tradespersonFolder = `portfolio-${tradespersonId}/`; // Create a folder for each tradesperson using their ID

  const bucket = storage.bucket(bucketName);

  // Generate a unique filename for the image
  const filename = image.originalname;

  // Create a write stream to upload the image to the bucket in the tradesperson's folder
  const file = bucket.file(`${tradespersonFolder}${filename}`);
  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  // Return a promise that resolves when the upload is complete
  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", () => {
      // Build the public URL for the uploaded image
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${tradespersonFolder}${filename}`;
      resolve(publicUrl);
    });

    stream.end(image.buffer);
  });
}



async function deleteImageFromStorage(url) {
  const filename = getFilenameFromUrl(url);
  const tradespersonId = getTradespersonIdFromUrl(url);
  const bucketName = getBucketNameFromUrl(url);

  const bucket = storage.bucket(bucketName);

  // Generate the full file path with "portfolio-tradespersonId" and filename
  const filePath = `portfolio-${tradespersonId}/${filename}`;

  const file = bucket.file(filePath);

  // Return a promise that resolves when the deletion is complete
  return file.delete();
}

// Helper function to extract filename from URL
const getFilenameFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

// Helper function to extract tradesperson ID from URL
const getTradespersonIdFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2].split("-")[1]; // Assumes the tradesperson ID is in the format "portfolio-{id}"
};

// Helper function to extract bucket name from URL
const getBucketNameFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 3];
};


module.exports = {
  uploadImageToStorage,
  deleteImageFromStorage,
};
