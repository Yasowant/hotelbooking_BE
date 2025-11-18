// src/db/pool.js
const { Pool } = require("pg");
const config = require("../config");

let pool;

const isUsingConnectionString =
  config.databaseUrl &&
  typeof config.databaseUrl === "string" &&
  config.databaseUrl.length > 0;

// helper to detect local host usage
function isLocalConnectionString(connStr) {
  if (!connStr) return false;
  // treat common localhost patterns as local
  return connStr.includes("localhost") || connStr.includes("127.0.0.1");
}

if (isUsingConnectionString) {
  // If the connection string points to a remote DB (Render), enable SSL.
  // If it looks like localhost, we won't add SSL so local dev works.
  const useSsl = !isLocalConnectionString(config.databaseUrl);

  pool = new Pool({
    connectionString: config.databaseUrl,
    // enable ssl for remote DBs (Render requires it).
    // rejectUnauthorized:false avoids certificate verification issues for managed DBs.
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });
} else {
  // Individual env vars path (local dev)
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  const useSsl = host && host !== "localhost" && host !== "127.0.0.1";

  pool = new Pool({
    user,
    password,
    host,
    port,
    database,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
