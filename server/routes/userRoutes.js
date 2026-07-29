const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const {
  gymName,
  ownerName,
  email,
  phone,
  gymAddress,
  password,
} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
  gymName,
  ownerName,
  email,
  phone,
  gymAddress,
  password: hashedPassword,
});

    await user.save();

    res.status(201).json({
      message: "Signup Successful",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
  message: "Login Successful",
  token,
  user: {
    _id: user._id,
    gymName: user.gymName,
    ownerName: user.ownerName,
    email: user.email,
    phone: user.phone,
    gymAddress: user.gymAddress,
    gymLogo: user.gymLogo,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;