const multer = require("multer");

// Configure the storage engine and destination
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // console.log(req);
    console.log(file);
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const { mimetype, size } = file;
    console.log("file.mimetype:", mimetype);
    console.log("file.size:", size);
    console.log("maxSize:", maxSize);

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file"));
    }
  },
});

const fileUpload = upload.array("files", 5);

// Export the middleware function
module.exports = fileUpload;
