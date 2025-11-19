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

const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: "lax",
    path: "/api/auth/refresh",
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updated = await userService.authService(req.params.id, req.body);
    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await authService.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // Try cookie first, then fallback to body.token
    const refreshToken =
      req.cookies && req.cookies.refreshToken
        ? req.cookies.refreshToken
        : req.body.refreshToken;

    // Revoke in DB (if present)
    await authService.logoutUser(refreshToken);

    // Clear cookie on response (so client loses the cookie)
    clearRefreshCookie(res);

    // Optionally instruct client to remove access token from client-side storage
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  logout
};
