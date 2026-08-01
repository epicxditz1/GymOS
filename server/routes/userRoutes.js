const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


// =======================
// Signup
// =======================
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

    if (
  !gymName ||
  !ownerName ||
  !email ||
  !phone ||
  !gymAddress ||
  !password
) {
  return res.status(400).json({
    message: "Please fill all fields",
  });
}


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
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Login
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
  return res.status(400).json({
    message: "Email and Password are required",
  });
}

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

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
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Get Logged In User
// =======================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Update Logged In User
// =======================
router.put(
  "/me",
  authMiddleware,
  upload.single("gymLogo"),
  async (req, res) => {
    try {

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const {
        gymName,
        ownerName,
        phone,
        gymAddress,
      } = req.body;

      if (gymName) user.gymName = gymName;
      if (ownerName) user.ownerName = ownerName;
      if (phone) user.phone = phone;
      if (gymAddress) user.gymAddress = gymAddress;

      if (req.file) {
        user.gymLogo = req.file.path;
      }

      await user.save();

      console.log("Updated User:", user);

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update Error:", error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;