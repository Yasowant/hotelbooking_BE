const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// CREATE room (admin, owner)
router.post("/", auth, role("admin", "owner"), roomController.createRoom);

// GET all rooms
router.get("/", roomController.getAllRooms);

// GET room by id
router.get("/:id", roomController.getRoomById);

// GET rooms for a specific hotel
router.get("/hotel/:hotel_id", roomController.getRoomsByHotel);

// UPDATE room
router.put("/:id", auth, role("admin", "owner"), roomController.updateRoom);

// DELETE room
router.delete("/:id", auth, role("admin", "owner"), roomController.deleteRoom);

module.exports = router;
