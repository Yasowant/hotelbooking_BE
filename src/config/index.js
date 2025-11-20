const dotenv = require("dotenv");
dotenv.config();

const clientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

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
  clientUrls,
  cookieSecure: process.env.COOKIE_SECURE === "true",
};
