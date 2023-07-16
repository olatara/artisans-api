const { Storage } = require("@google-cloud/storage");
const config = require("../config");

const storage = new Storage({
  projectId: config.gcp.images.projectId,
  keyFilename: config.gcp.images.keyFilename,
});

async function uploadImageToStorage(image, bucketKey) {
  console.log(bucketKey);
  const bucketName = config.gcp.images.buckets[bucketKey];
  const bucket = storage.bucket(bucketName);

  // Generate a unique filename for the image
  const filename = `${Date.now()}_${image.originalname}`;

  // Create a write stream to upload the image to the bucket
  const file = bucket.file(filename);
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
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
      resolve(publicUrl);
    });

    stream.end(image.buffer);
  });
}

async function deleteImageFromStorage(url) {
  const filename = getFilenameFromUrl(url);
  const bucketName = getBucketNameFromUrl(url);

  const bucket = storage.bucket(bucketName);

  const file = bucket.file(filename);

  // Return a promise that resolves when the deletion is complete
  return file.delete();
}

// Helper function to extract filename from URL
const getFilenameFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

// Helper function to extract bucket name from URL
const getBucketNameFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

module.exports = {
  uploadImageToStorage,
  deleteImageFromStorage,
};
