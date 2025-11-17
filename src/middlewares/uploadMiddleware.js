const multer = require("multer");

// Store file in memory buffer, NOT disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
