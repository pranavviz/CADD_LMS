const { Enrollment, Course, User } = require("../models");

// Enroll authenticated user in a course
exports.enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({ where: { userId, courseId } });
    if (existing) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: 0,
      completed: false,
    });

    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

// Get all enrollments for the authenticated user
exports.getUserEnrollments = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: [Course],
    });

    if (!enrollments.length) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    res.status(200).json(enrollments);
  } catch (err) {
    next(err);
  }
};

// Get list of students enrolled in a specific course
exports.getCourseStudents = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const enrollments = await Enrollment.findAll({
      where: { courseId },
      include: [User],
    });

    if (!enrollments.length) {
      return res.status(404).json({ message: "No students enrolled" });
    }

    res.status(200).json(enrollments);
  } catch (err) {
    next(err);
  }
};

// Update progress or completion status of a course for a student
exports.updateProgress = async (req, res, next) => {
  try {
    const { enrollmentId } = req.params;
    const { progress, completed } = req.body;

    const enrollment = await Enrollment.findByPk(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.progress = progress ?? enrollment.progress;
    enrollment.completed = completed ?? enrollment.completed;

    await enrollment.save();

    res.status(200).json(enrollment);
  } catch (err) {
    next(err);
  }
};
