const jwt = require("jsonwebtoken");
const { User, Course, Module, Lesson } = require("../models");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token is required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    next();
  };
};

const isOwner = (model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    let record;

    switch (model) {
      case "course":
        record = await Course.findByPk(id);
        break;
      case "module":
        record = await Module.findByPk(id);
        break;
      case "lesson":
        record = await Lesson.findByPk(id);
        break;
      default:
        return res.status(400).json({ message: "Invalid model" });
    }

    if (!record) return res.status(404).json({ message: `${model} not found` });
    if (record.userId !== req.userId)
      return res.status(403).json({ message: "You are not the owner" });

    next();
  };
};

module.exports = { verifyToken, checkRole, isOwner };
