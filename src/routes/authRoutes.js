const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars"),
  ],
  validate,
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").exists().withMessage("Password required"),
  ],
  validate,
  authController.login
);

router.get("/", auth, role("admin"), authController.getAllUsers);
router.get("/:id", auth, authController.getUser);
router.put("/:id", auth, role("admin"), authController.updateUser);
router.delete("/:id", auth, role("admin"), authController.deleteUser);
router.post("/logout", authController.logout);

module.exports = router;
