const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const {
  verifyToken,
  checkRole,
  isOwner,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/module/:moduleId", lessonController.getLessons); // ✅ All lessons for a module
router.get("/:id", lessonController.getLessonById); // ✅ Single lesson by id

// Protected routes (admin/instructor only)
router.post(
  "/:moduleId",
  verifyToken,
  checkRole(["admin", "instructor"]),
  lessonController.createLesson
);
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  isOwner("lesson"),
  lessonController.updateLesson
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  isOwner("lesson"),
  lessonController.deleteLesson
);

module.exports = router;
