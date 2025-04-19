const { Module, Course } = require("../models");

exports.createModule = async (req, res, next) => {
  try {
    const { title, courseId, orderIndex } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const module = await Module.create({
      title,
      courseId,
      orderIndex,
    });

    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

exports.getModules = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const modules = await Module.findAll({ where: { courseId } });

    if (modules.length === 0)
      return res
        .status(404)
        .json({ message: "No modules found for this course" });

    res.status(200).json(modules);
  } catch (err) {
    next(err);
  }
};

exports.getModuleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await Module.findByPk(id);

    if (!module) return res.status(404).json({ message: "Module not found" });

    res.status(200).json(module);
  } catch (err) {
    next(err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, orderIndex } = req.body;

    const module = await Module.findByPk(id);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.title = title || module.title;
    module.orderIndex = orderIndex || module.orderIndex;

    await module.save();

    res.status(200).json(module);
  } catch (err) {
    next(err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await Module.findByPk(id);

    if (!module) return res.status(404).json({ message: "Module not found" });

    await module.destroy();

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (err) {
    next(err);
  }
};
