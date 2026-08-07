const express = require("express");
const router = express.Router();
console.log("✅ userRoutes loaded");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");


// =======================
// Signup
// =======================
router.post(
  "/signup",
  authController.signup
);

// =======================
// Login
// =======================
router.post(
  "/login",
  authController.login
);

// =======================
// Get Logged In User
// =======================
router.get(
  "/me",
  authMiddleware,
  authController.getMe
);

// =======================
// Update Logged In User
// =======================
router.put(
  "/me",
  authMiddleware,
  upload.single("gymLogo"),
  authController.updateProfile
);

router.post(
  "/verify-otp",
  authController.verifyOTP
);

router.post(
  "/resend-otp",
  authController.resendOTP
);

router.post(
  "/forgot-password",
  authController.forgotPassword
);

router.post(
  "/verify-forgot-password-otp",
  authController.verifyForgotPasswordOTP
);

router.post(
  "/reset-password",
  authController.resetPassword
);

module.exports = router;