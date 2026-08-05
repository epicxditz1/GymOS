const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../services/emailService");

const pendingSignups = {};

// ======================
// Signup
// ======================
exports.signup = async (req, res) => {
    console.log("🔥 Signup API Hit");
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

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    delete pendingSignups[normalizedEmail];

    const otp = generateOTP();

    pendingSignups[normalizedEmail] = {
      gymName,
      ownerName,
      phone,
      gymAddress,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    };

    setTimeout(() => {
      delete pendingSignups[normalizedEmail];
    }, 5 * 60 * 1000);

    try {
      await sendOTP(normalizedEmail, otp);
    } catch (err) {
      delete pendingSignups[normalizedEmail];
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      email: normalizedEmail,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Login
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
        console.log("🔥 Verify OTP API Hit");
      return res.status(403).json({
        message: "Please verify your email first.",
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
        tokenVersion: user.tokenVersion,
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
};

// ======================
// Get Logged In User
// ======================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

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
};

// ======================
// Update Profile
// ======================
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    );

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

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Resend OTP
// ======================
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const pendingUser =
      pendingSignups[normalizedEmail];

    if (!pendingUser) {
      return res.status(400).json({
        message:
          "Signup session expired. Please signup again.",
      });
    }

    const otp = generateOTP();

    pendingUser.otp = otp;
    pendingUser.otpExpiry =
      Date.now() + 5 * 60 * 1000;

    await sendOTP(normalizedEmail, otp);

    res.status(200).json({
      message: "OTP sent again successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Verify OTP
// ======================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const pendingUser =
  pendingSignups[normalizedEmail];

if (!pendingUser) {
  return res.status(400).json({
    message: "Signup session expired. Please signup again.",
  });
}

console.log("Entered OTP:", otp);
console.log("Stored OTP:", pendingUser.otp);
console.log("Types:", typeof otp, typeof pendingUser.otp);


    console.log("Entered OTP:", otp);
console.log("Stored OTP:", pendingUser.otp);

if (pendingUser.otp !== otp) {
  console.log("❌ OTP MISMATCH");

  return res.status(400).json({
    message: "Invalid OTP",
  });
}

console.log("✅ OTP MATCH");

    if (pendingUser.otpExpiry < Date.now()) {
      delete pendingSignups[normalizedEmail];

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      delete pendingSignups[normalizedEmail];

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      pendingUser.password,
      10
    );

    const user = await User.create({
      gymName: pendingUser.gymName,
      ownerName: pendingUser.ownerName,
      email: normalizedEmail,
      phone: pendingUser.phone,
      gymAddress: pendingUser.gymAddress,
      password: hashedPassword,
      isVerified: true,
    });

    delete pendingSignups[normalizedEmail];

    const token = jwt.sign(
      {
        userId: user._id,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Account created successfully",
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
};