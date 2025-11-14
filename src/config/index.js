// src/config/index.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || null,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
  },
  bcryptRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),
  clientUrl: process.env.CLIENT_URL,
  cookieSecure: process.env.COOKIE_SECURE === "true",
};
