// src/services/authService.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../config");
const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const { v4: uuidv4 } = require("uuid");

const signAccessToken = (payload) =>
  jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

const signRefreshToken = (payload) =>
  jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

const parseDurationToMs = (d) => {
  if (!d) return 0;
  if (/^\d+$/.test(d)) return parseInt(d, 10);
  const m = d.match(/^(\d+)(s|m|h|d)$/);
  if (!m) return 0;
  const v = parseInt(m[1], 10),
    u = m[2];
  switch (u) {
    case "s":
      return v * 1000;
    case "m":
      return v * 60 * 1000;
    case "h":
      return v * 60 * 60 * 1000;
    case "d":
      return v * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

/* register omitted here — keep your existing one */

const loginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};

/**
 * Creates access & refresh tokens for a user and persists hashed refresh token.
 * Returns { accessToken, refreshToken, refreshExpiresAt }
 */
const createTokensForUser = async (
  user,
  { ipAddress = null, userAgent = null } = {}
) => {
  const accessPayload = { sub: user.id, email: user.email };
  const accessToken = signAccessToken(accessPayload);

  const refreshId = uuidv4();
  const refreshPayload = { sub: user.id, rid: refreshId };
  const refreshToken = signRefreshToken(refreshPayload);

  const refreshExpiresAt = new Date(
    Date.now() + parseDurationToMs(config.jwt.refreshExpiresIn)
  );

  // persist hashed refresh token
  await tokenModel.saveRefreshToken({
    user_id: user.id,
    token_hash: hashToken(refreshToken),
    expires_at: refreshExpiresAt,
    user_agent: userAgent,
    ip_address: ipAddress,
  });

  return { accessToken, refreshToken, refreshExpiresAt };
};

const verifyAccessToken = (token) => jwt.verify(token, config.jwt.accessSecret);
const verifyRefreshToken = (token) =>
  jwt.verify(token, config.jwt.refreshSecret);

const registerUser = async ({ first_name, last_name, email, password }) => {
  const existing = await userModel.findUserByEmail(email);
  if (existing) {
    const err = new Error("Email already in use");
    err.status = 400;
    throw err;
  }
  const password_hash = await bcrypt.hash(password, config.bcryptRounds);
  const user = await userModel.createUser({
    email,
    password_hash,
    first_name,
    last_name,
  });
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  createTokensForUser,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
};
