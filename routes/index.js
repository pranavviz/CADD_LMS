const express = require("express");
const router = express.Router();

// Import individual route files
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const moduleRoutes = require("./moduleRoutes");
const lessonRoutes = require("./lessonRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");

// Mount route modules
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/modules", moduleRoutes);
router.use("/lessons", lessonRoutes);
router.use("/enrollments", enrollmentRoutes);

// Export the router
module.exports = router;
