const cloudinary = require("../config/cloudinary");

const uploadBufferToCloudinary = (buffer, folder = "hotel_app/hotels") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          const err = new Error(error.message || "Cloudinary upload failed");
          err.details = error;
          return reject(err);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const deleteCloudinaryImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = { uploadBufferToCloudinary, deleteCloudinaryImage };
