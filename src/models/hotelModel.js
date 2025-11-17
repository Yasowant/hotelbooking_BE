const db = require("../db/pool");

async function createHotel({
  owner_id,
  name,
  description,
  city,
  address,
  star_rating,
}) {
  const q = `
    INSERT INTO hotels(owner_id,name,description,city,address,star_rating)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `;
  const { rows } = await db.query(q, [
    owner_id,
    name,
    description || null,
    city,
    address,
    star_rating || 3,
  ]);
  return rows[0];
}

async function getAllHotels() {
  const q = `
  SELECT *
  FROM hotels
  ORDER BY created_at DESC;
  `;

  const { rows } = await db.query(q);
  return rows;
}

async function getHotelById(id) {
  const q = `SELECT * FROM hotels WHERE id = $1 LIMIT 1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

async function updateHotel(id, data) {
  // Build SET fields dynamically
  const fields = Object.keys(data)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(data);

  const q = `
    UPDATE hotels
    SET ${fields}
    WHERE id = $${values.length + 1}
    RETURNING *;
  `;

  const { rows } = await db.query(q, [...values, id]);
  return rows[0];
}

const deleteHotel = async (id) => {
  const q = `
  DELETE FROM hotels WHERE id=$1;
  `;
  const { rows } = await db.query(q, [id]);
  return rows[0];
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
