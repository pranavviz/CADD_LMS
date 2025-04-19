// middleware/validationRules.js
const { body } = require("express-validator");

const registrationValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
  body("role")
    .isIn(["admin", "instructor", "student"])
    .withMessage("Invalid role"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const courseValidation = [
  body("title").notEmpty().withMessage("Title required"),
  body("description").notEmpty().withMessage("Description required"),
  body("level").notEmpty().withMessage("Level required"),
  body("category").notEmpty().withMessage("Category required"),
];

module.exports = {
  registrationValidation,
  loginValidation,
  courseValidation,
};
