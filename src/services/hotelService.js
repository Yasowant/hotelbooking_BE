const hotelModel = require("../models/hotelModel");

const createHotel = async (data) => {
  return await hotelModel.createHotel(data);
};

const getAllHotels = async () => {
  return await hotelModel.getAllHotels();
};

const getHotelById = async (id) => {
  const hotel = await hotelModel.getHotelById(id);
  if (!hotel) {
    const err = new Error("Hotel not found");
    err.status = 404;
    throw err;
  }
  return hotel;
};

const updateHotel = async (id, data, user) => {
  const hotel = await hotelModel.getHotelById(id);

  if (!hotel) {
    const err = new Error("Hotel not found");
    err.status = 404;
    throw err;
  }

  // Owner can update only their own hotel
  if (user.role === "owner" && hotel.owner_id !== user.id) {
    const err = new Error("Permission denied");
    err.status = 403;
    throw err;
  }

  return await hotelModel.updateHotel(id, data);
};

const deleteHotel = async (id, user) => {
  const hotel = await hotelModel.getHotelById(id);

  if (!hotel) {
    const err = new Error("Hotel not found");
    err.status = 404;
    throw err;
  }

  if (user.role === "owner" && hotel.owner_id !== user.id) {
    const err = new Error("Permission denied");
    err.status = 403;
    throw err;
  }

  await hotelModel.deleteHotel(id);
  return true;
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
