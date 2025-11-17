const db = require("../db/pool");

async function createUser({
  email,
  password_hash,
  first_name,
  last_name,
  role,
  phone,
}) {
  const q = `
    INSERT INTO users (email, password_hash, first_name, last_name, role, phone)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, first_name, last_name, role, phone, created_at
  `;
  const { rows } = await db.query(q, [
    email,
    password_hash,
    first_name || null,
    last_name || null,
    role || "user",
    phone || null,
  ]);
  return rows[0];
}

async function findUserByEmail(email) {
  const q = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
  const { rows } = await db.query(q, [email]);
  return rows[0];
}

async function findUserById(id) {
  const q = `SELECT id, email, first_name, last_name, role, phone, created_at FROM users WHERE id = $1 LIMIT 1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

async function getAllUsers() {
  const q = `SELECT * FROM users ORDER BY created_at DESC`;
  const { rows } = await db.query(q);
  return rows;
}

async function updateUser(id, data) {
  const fields = Object.keys(data)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(data);

  const q = `
    UPDATE users
    SET ${fields}
    WHERE id = $${values.length + 1}
    RETURNING id, email, first_name, last_name, role, phone, created_at;
  `;

  const { rows } = await db.query(q, [...values, id]);
  return rows[0];
}

async function deleteUser(id) {
  await db.query(
    `
    DELETE FROM users WHERE id=$1`,
    [id]
  );
  return true;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
