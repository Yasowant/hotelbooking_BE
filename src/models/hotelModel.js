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

module.exports = { createHotel };
