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

    subscription: {
  plan: {
    type: String,
    enum: ["trial", "monthly", "quarterly"],
    default: "trial",
  },

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },

  trialStartedAt: {
    type: Date,
    default: Date.now,
  },

  trialEndsAt: {
    type: Date,
    default: () =>
      new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
  },

  subscriptionStartedAt: {
    type: Date,
    default: null,
  },

  subscriptionEndsAt: {
    type: Date,
    default: null,
  },

  razorpayOrderId: {
    type: String,
    default: "",
  },

  razorpayPaymentId: {
    type: String,
    default: "",
  },
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);