const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController"); // Correct import
const { validate } = require("../middleware/validateMiddleware");
const {
  registrationValidation,
  loginValidation,
  courseValidation,
} = require("../middleware/validationRules");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

// Public routes
router.get("/", courseController.getCourses); // Pagination/filtering
router.get("/:id", courseController.getCourseById);

// Protected routes (admin/instructor only)
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "instructor"]),
  validate(courseValidation),
  courseController.createCourse
);
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  validate(courseValidation),
  courseController.updateCourse
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "instructor"]),
  courseController.deleteCourse
);

// Course statistics (admin only)
router.get(
  "/stats",
  verifyToken,
  checkRole(["admin"]),
  courseController.getCoursesStats
);

module.exports = router;
