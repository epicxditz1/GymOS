const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gymAddress: {
      type: String,
      required: true,
      trim: true,
    },

    gymLogo: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: "",
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);