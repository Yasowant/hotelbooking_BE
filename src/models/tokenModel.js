const db = require("../db/pool");

const saveRefreshToken = async ({
  user_id,
  token_hash,
  expires_at,
  user_agent = null,
  ip_address = null,
}) => {
  const q = `
    INSERT INTO refresh_tokens (user_id, token_hash, expires_at, user_agent, ip_address)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id, expires_at, created_at
  `;
  const { rows } = await db.query(q, [
    user_id,
    token_hash,
    expires_at,
    user_agent,
    ip_address,
  ]);
  return rows[0];
};
const findByTokenHash = async (token_hash) => {
  const q = `SELECT * FROM refresh_tokens WHERE token_hash = $1 LIMIT 1`;
  const { rows } = await db.query(q, [token_hash]);
  return rows[0];
};

const revokeById = async (id) => {
  const q = `UPDATE refresh_tokens SET revoked = true WHERE id = $1 RETURNING *`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
};

module.exports = { saveRefreshToken, findByTokenHash, revokeById };
