const { body, validationResult } = require("express-validator");

// Define the validate middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

// Validation rules
const courseValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title should be at least 3 characters"),
  body("description").notEmpty().withMessage("Description is required"),
  body("level").notEmpty().withMessage("Level is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

module.exports = { validate, courseValidation };
