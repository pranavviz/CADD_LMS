const { Course, User } = require("../models");
const { Op } = require("sequelize");

exports.createCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      instructorId,
      duration,
      level,
      category,
      thumbnail,
    } = req.body;

    const instructor = await User.findByPk(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(400).json({ message: "Invalid instructor" });
    }

    const course = await Course.create({
      title,
      description,
      instructorId,
      duration,
      level,
      category,
      thumbnail,
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, title, category } = req.query;

    const filters = {};
    if (title) filters.title = { [Op.like]: `%${title}%` };
    if (category) filters.category = category;

    const courses = await Course.findAll({
      where: filters,
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    const totalCount = await Course.count({ where: filters });

    res.status(200).json({
      courses,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, duration, level, category, thumbnail } =
      req.body;

    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.level = level || course.level;
    course.category = category || course.category;
    course.thumbnail = thumbnail || course.thumbnail;

    await course.save();

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.destroy();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getCoursesStats = async (req, res, next) => {
  try {
    const courseCount = await Course.count();
    const avgDuration = await Course.avg("duration");

    res.status(200).json({
      totalCourses: courseCount,
      averageDuration: avgDuration || 0,
    });
  } catch (err) {
    next(err);
  }
};
