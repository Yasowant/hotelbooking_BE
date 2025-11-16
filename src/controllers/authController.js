const authService = require("../services/authService");
const config = require("../config");

const setRefreshCookie = (res, token, expiresAt) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: config.cookieSecure, // true in production (HTTPS)
    sameSite: "lax",
    path: "/api/auth/refresh",
    expires: expiresAt,
  });
};

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, role, phone } = req.body;
    const user = await authService.registerUser({
      first_name,
      last_name,
      email,
      password,
      role,
      phone,
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser({ email, password });

    const { accessToken, refreshToken, refreshExpiresAt } =
      await authService.createTokensForUser(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        { ipAddress: req.ip, userAgent: req.get("User-Agent") }
      );

    setRefreshCookie(res, refreshToken, refreshExpiresAt);

    res.json({
      user,
      accessToken,
      accessExpiresIn: config.jwt.accessExpiresIn,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
