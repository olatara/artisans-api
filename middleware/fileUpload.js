const multer = require('multer');

// Configure the storage engine and destination
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (allowedMimeTypes.includes(file.mimetype) && file.size <= maxSize) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file'));
    }
  },
});

const fileUpload = upload.array('files', 5);

// Export the middleware function
module.exports = fileUpload;