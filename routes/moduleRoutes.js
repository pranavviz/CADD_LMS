const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const {
  verifyToken,
  checkRole,
  isOwner,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/:courseId", moduleController.getModules);

// Protected routes (admin/instructor only)
router.post(
  "/:courseId",
  verifyToken,
  checkRole(["admin", "instructor"]),
  moduleController.createModule
);
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  isOwner("module"),
  moduleController.updateModule
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  isOwner("module"),
  moduleController.deleteModule
);

module.exports = router;
