import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },

    memberName: {
      type: String,
      required: true,
      trim: true,
    },

    plan: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["New Registration", "Renewal"],
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------------
      Indexes
------------------------- */

paymentSchema.index({ paymentDate: -1 });

paymentSchema.index({
  memberId: 1,
  paymentDate: -1,
});

const Payment = mongoose.model(
  "Payment",
  paymentSchema
);

export default Payment;