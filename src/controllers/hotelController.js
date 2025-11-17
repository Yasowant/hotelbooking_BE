const hotelService = require("../services/hotelService");

const createHotel = async (req, res, next) => {
  try {
    const { name, description, city, address, star_rating } = req.body;

    const hotel = await hotelService.createHotel({
      owner_id: req.user.id,
      name,
      description,
      city,
      address,
      star_rating,
    });

    res.status(201).json({ hotel });
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await hotelService.getAllHotels();
    res.json({ hotels });
  } catch (err) {
    next(err);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id);
    res.json({ hotel });
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updated = await hotelService.updateHotel(
      req.params.id,
      req.body,
      req.user
    );

    res.json({ hotel: updated });
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await hotelService.deleteHotel(req.params.id, req.user);
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
