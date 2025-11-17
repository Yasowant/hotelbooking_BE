const db = require("../db/pool");

async function createRoom({
  hotel_id,
  room_type,
  price,
  max_guests,
  total_rooms,
}) {
  const q = `
    INSERT INTO rooms(hotel_id,room_type,price,max_guests,total_rooms)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *;
    `;

  const { rows } = await db.query(q, [
    hotel_id,
    room_type,
    price,
    max_guests,
    total_rooms,
  ]);

  return rows[0];
}

async function getAllRooms() {
  const q = `
    SELECT *
    FROM rooms
    ORDER BY created_at DESC
    `;
  const { rows } = await db.query(q);
  return rows;
}

async function getRoomsByHotel(hotel_id) {
  const q = `
    SELECT *
    FROM rooms
    WHERE hotel_id = $1
    ORDER BY created_at DESC;
  `;
  const { rows } = await db.query(q, [hotel_id]);
  return rows;
}

async function getRoomById(id) {
  const q = `SELECT * FROM rooms WHERE id = $1 LIMIT 1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

async function updateRoom(id, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) return null;

  const setFields = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const q = `
    UPDATE rooms
    SET ${setFields}
    WHERE id = $${values.length + 1}
    RETURNING *;
  `;

  const { rows } = await db.query(q, [...values, id]);
  return rows[0];
}

async function deleteRoom(id) {
  const q = `
    DELETE FROM rooms WHERE id = $1
    RETURNING *;
  `;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

module.exports = {
  createRoom,
  getAllRooms,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom,
};
