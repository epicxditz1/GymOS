const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { plan } = req.body;

let amount = 0;

if (plan === "monthly") {
  amount = 199;
} else if (plan === "3months") {
  amount = 499;
} else {
  return res.status(400).json({
    message: "Invalid Plan",
  });
}

const options = {
  amount: amount * 100,
  currency: "INR",
  receipt: `receipt_${Date.now()}`,
};

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to create order",
    });
  }
});

module.exports = router;