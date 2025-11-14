const db = require("../db/pool");

async function createUser({ email, password_hash, first_name, last_name }) {
  const q = `
    INSERT INTO users (email, password_hash, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, first_name, last_name, created_at
  `;
  const { rows } = await db.query(q, [
    email,
    password_hash,
    first_name || null,
    last_name || null,
  ]);
  return rows[0];
}

async function findUserByEmail(email) {
  const q = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
  const { rows } = await db.query(q, [email]);
  return rows[0];
}

async function findUserById(id) {
  const q = `SELECT id, email, first_name, last_name, created_at FROM users WHERE id = $1 LIMIT 1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
