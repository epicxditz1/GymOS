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

module.exports = router;