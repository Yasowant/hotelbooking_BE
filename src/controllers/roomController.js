const roomService = require("../services/roomService");

const createRoom = async (req, res, next) => {
  try {
    const { hotel_id, room_type, price, max_guests, total_rooms } = req.body;

    const room = await roomService.createRoom({
      hotel_id,
      room_type,
      price,
      max_guests,
      total_rooms,
      user: req.user,
    });

    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.json({ room });
  } catch (err) {
    next(err);
  }
};

const getRoomsByHotel = async (req, res, next) => {
  try {
    const rooms = await roomService.getRoomsByHotel(req.params.hotel_id);
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updated = await roomService.updateRoom(
      req.params.id,
      req.body,
      req.user
    );
    res.json({ room: updated });
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await roomService.deleteRoom(req.params.id, req.user);
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
