// src/db/pool.js
const { Pool } = require("pg");
const config = require("../config");

let pool;

if (config.databaseUrl && typeof config.databaseUrl === "string") {
  pool = new Pool({ connectionString: config.databaseUrl });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    database: process.env.DB_NAME,
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
