const db = require("../db/pool");

async function addHotelImage(hotel_id, image_url, public_id) {
  const q = `
    INSERT INTO hotel_images (hotel_id, image_url, public_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await db.query(q, [hotel_id, image_url, public_id]);
  return rows[0];
}

async function getImagesByHotelId(hotel_id) {
  const q = `SELECT * FROM hotel_images WHERE hotel_id = $1 ORDER BY created_at DESC`;
  const { rows } = await db.query(q, [hotel_id]);
  return rows;
}

async function getImageById(id) {
  const q = `SELECT * FROM hotel_images WHERE id = $1 LIMIT 1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

async function deleteImageById(id) {
  const q = `DELETE FROM hotel_images WHERE id = $1 RETURNING *`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

module.exports = {
  addHotelImage,
  getImagesByHotelId,
  getImageById,
  deleteImageById,
};
