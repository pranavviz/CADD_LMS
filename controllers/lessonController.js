const { Lesson, Module } = require("../models");

exports.createLesson = async (req, res, next) => {
  try {
    const { title, moduleId, content, videoUrl, duration, orderIndex } =
      req.body;

    const module = await Module.findByPk(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const lesson = await Lesson.create({
      title,
      moduleId,
      content,
      videoUrl,
      duration,
      orderIndex,
    });

    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
};

exports.getLessons = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const lessons = await Lesson.findAll({ where: { moduleId } });

    if (lessons.length === 0)
      return res
        .status(404)
        .json({ message: "No lessons found for this module" });

    res.status(200).json(lessons);
  } catch (err) {
    next(err);
  }
};

exports.getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json(lesson);
  } catch (err) {
    next(err);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, videoUrl, duration, orderIndex } = req.body;

    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.videoUrl = videoUrl || lesson.videoUrl;
    lesson.duration = duration || lesson.duration;
    lesson.orderIndex = orderIndex || lesson.orderIndex;

    await lesson.save();

    res.status(200).json(lesson);
  } catch (err) {
    next(err);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    await lesson.destroy();

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err) {
    next(err);
  }
};
