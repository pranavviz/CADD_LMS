const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes (user can enroll in courses)
router.post("/:courseId", verifyToken, enrollmentController.enrollInCourse);

// User routes (view progress)
router.get("/my-courses", verifyToken, enrollmentController.getUserEnrollments);

// Instructor routes (view enrolled students)
router.get(
  "/course/:courseId/students",
  verifyToken,
  enrollmentController.getCourseStudents
);

// Update progress for enrolled courses
router.put(
  "/progress/:enrollmentId",
  verifyToken,
  enrollmentController.updateProgress
);

module.exports = router;
