const hotelImageModel = require("../models/hotelImageModel");
const { deleteCloudinaryImage } = require("../services/cloudinaryService");

const addImage = async (hotel_id, fileBuffer) => {
  const uploaded =
    await require("../services/cloudinaryService").uploadBufferToCloudinary(
      fileBuffer
    );

  const image = await hotelImageModel.addHotelImage(
    hotel_id,
    uploaded.secure_url,
    uploaded.public_id
  );

  return image;
};

const getImagesByHotel = async (hotel_id) => {
  return await hotelImageModel.getImagesByHotelId(hotel_id);
};

const getImage = async (id) => {
  const image = await hotelImageModel.getImageById(id);
  if (!image) {
    const err = new Error("Image not found");
    err.status = 404;
    throw err;
  }
  return image;
};

const deleteImage = async (id) => {
  const image = await hotelImageModel.getImageById(id);
  if (!image) {
    const err = new Error("Image not found");
    err.status = 404;
    throw err;
  }

  // Delete from Cloudinary
  await deleteCloudinaryImage(image.public_id);

  // Delete from DB
  await hotelImageModel.deleteImageById(id);

  return true;
};

module.exports = {
  addImage,
  getImagesByHotel,
  getImage,
  deleteImage,
};
