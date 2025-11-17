// src/middlewares/roleMiddleware.js
module.exports = function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
