const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Access denied.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("========== AUTH DEBUG ==========");
    console.log("Decoded JWT:", decoded);

    const user = await User.findById(
  decoded.userId
).select("-password -otp");

console.log("Found User:", user);
console.log("================================");

    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    if (
      decoded.tokenVersion !==
      user.tokenVersion
    ) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;