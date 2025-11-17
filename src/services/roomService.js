const roomModel = require("../models/roomModel");
const hotelModel = require("../models/hotelModel");

const createRoom = async ({
  hotel_id,
  room_type,
  price,
  max_guests,
  total_rooms,
  user,
}) => {
  const hotel = await hotelModel.getHotelById(hotel_id);
  if (!hotel) {
    const err = new Error("Hotel not found");
    err.status = 404;
    throw err;
  }

  // Owners can add rooms only to their own hotel
  if (user.role === "owner" && hotel.owner_id !== user.id) {
    const err = new Error("Permission denied");
    err.status = 403;
    throw err;
  }

  return await roomModel.createRoom({
    hotel_id,
    room_type,
    price,
    max_guests,
    total_rooms,
  });
};

const getAllRooms = async () => {
  return await roomModel.getAllRooms();
};

const getRoomById = async (id) => {
  const room = await roomModel.getRoomById(id);
  if (!room) {
    const err = new Error("Room not found");
    err.status = 404;
    throw err;
  }
  return room;
};

const getRoomsByHotel = async (hotel_id) => {
  return await roomModel.getRoomsByHotel(hotel_id);
};

const updateRoom = async (id, data, user) => {
  const room = await roomModel.getRoomById(id);
  if (!room) {
    const err = new Error("Room not found");
    err.status = 404;
    throw err;
  }

  const hotel = await hotelModel.getHotelById(room.hotel_id);

  if (user.role === "owner" && hotel.owner_id !== user.id) {
    const err = new Error("Permission denied");
    err.status = 403;
    throw err;
  }

  return await roomModel.updateRoom(id, data);
};

const deleteRoom = async (id, user) => {
  const room = await roomModel.getRoomById(id);
  if (!room) {
    const err = new Error("Room not found");
    err.status = 404;
    throw err;
  }

  const hotel = await hotelModel.getHotelById(room.hotel_id);

  if (user.role === "owner" && hotel.owner_id !== user.id) {
    const err = new Error("Permission denied");
    err.status = 403;
    throw err;
  }

  await roomModel.deleteRoom(id);
  return true;
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
