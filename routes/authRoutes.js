const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Import authController
const { validate } = require("../middleware/validateMiddleware");
const {
  registrationValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../middleware/validationRules");

router.post(
  "/register",
  validate(registrationValidation),
  authController.register // Call the register method from authController
);
router.post("/login", validate(loginValidation), authController.login);
router.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  authController.forgotPassword
);
router.post(
  "/reset-password/:token",
  validate(resetPasswordValidation),
  authController.resetPassword
);
//router.get("/verify-email/:token", authController.verifyEmail);

module.exports = router;
