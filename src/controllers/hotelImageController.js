const hotelImageService = require("../services/hotelImageService");

const uploadHotelImage = async (req, res, next) => {
  try {
    const { hotel_id } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const image = await hotelImageService.addImage(hotel_id, req.file.buffer);

    res.status(201).json({
      message: "Image uploaded",
      image,
    });
  } catch (err) {
    next(err);
  }
};

const getHotelImages = async (req, res, next) => {
  try {
    const images = await hotelImageService.getImagesByHotel(
      req.params.hotel_id
    );
    res.json({ images });
  } catch (err) {
    next(err);
  }
};

const getImageById = async (req, res, next) => {
  try {
    const image = await hotelImageService.getImage(req.params.id);
    res.json({ image });
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await hotelImageService.deleteImage(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadHotelImage,
  getHotelImages,
  getImageById,
  deleteImage,
};
