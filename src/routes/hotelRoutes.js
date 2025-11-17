const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");


router.post("/", auth, role("admin", "owner"), hotelController.createHotel);
router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getHotelById);
router.put("/:id", auth, role("admin", "owner"), hotelController.updateHotel);
router.delete(
  "/:id",
  auth,
  role("admin", "owner"),
  hotelController.deleteHotel
);


module.exports = router;
