const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

// Public
router.get("/", verifyToken, checkRole(["admin"]), userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);

// Admin-only
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  userController.updateUser
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  userController.deleteUser
);

module.exports = router;
