const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  uploadHotelImage,
  getHotelImages,
  getImageById,
  deleteImage,
} = require("../controllers/hotelImageController");

// Upload image
router.post(
  "/upload",
  auth,
  role("admin", "owner"),
  upload.single("image"),
  uploadHotelImage
);

// Get all images for one hotel
router.get("/:hotel_id", getHotelImages);

// Get single image details
router.get("/image/:id", getImageById);

// Delete image
router.delete("/image/:id", auth, role("admin", "owner"), deleteImage);

module.exports = router;
