const express = require("express");
const router = express.Router();

const Member = require("../models/Member");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

router.use(authMiddleware);
router.use(subscriptionMiddleware);

// =======================
// Save Member
// =======================
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (req.file) {
      req.body.photo = req.file.path;
    }

    console.log("USER:", req.user);

    req.body.owner = req.user._id;

    console.log(req.body);

    const member = new Member(req.body);
    await member.save();

    res.status(201).json({
      message: "✅ Member Saved Successfully",
      member,
    });
  } catch (error) {
    console.error("❌ Save Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Get All Members
// =======================
router.get("/", async (req, res) => {
  try {
    const members = await Member.find({
  owner: req.user._id,
}).sort({ _id: -1 });

    res.status(200).json(members);
  } catch (error) {
    console.error("❌ Error Fetching Members:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Delete Member
// =======================
router.delete("/:id", async (req, res) => {
  try {
const deletedMember = await Member.findOneAndDelete({
  _id: req.params.id,
  owner: req.user._id,
});

if (!deletedMember) {
  return res.status(404).json({
    message: "Member not found",
  });
}

    res.json({
      message: "✅ Member Deleted Successfully",
    });
  } catch (error) {
    console.error("❌ Delete Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =======================
// Update Member
// =======================
router.put("/:id", upload.any(), async (req, res) => {
  try {
    console.log("PUT ID:", req.params.id);
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    if (req.files && req.files.length > 0) {
      req.body.photo = req.files[0].path;
    }

    console.log("paymentHistory value:", req.body.paymentHistory);
    console.log("paymentHistory type:", typeof req.body.paymentHistory);

    if (
  req.body.paymentHistory &&
  typeof req.body.paymentHistory === "string"
) {
  req.body.paymentHistory = JSON.parse(
    req.body.paymentHistory
  );
}

    const existingMember = await Member.findOne({
  _id: req.params.id,
  owner: req.user._id,
});

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const updatedMember = await Member.findOneAndUpdate(
  {
    _id: req.params.id,
    owner: req.user._id,
  },
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

    res.json({
      message: "✅ Member Updated Successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// =======================
// Dashboard Stats
// =======================
router.get("/stats", async (req, res) => {
  try {
    const members = await Member.find({
      owner: req.user._id,
    });

    const totalMembers = members.length;

    const paidMembers = members.filter(
      (m) => m.status === "Paid"
    ).length;

    const unpaidMembers = members.filter(
      (m) => m.status === "Unpaid"
    ).length;

    const totalRevenue = members
      .filter((m) => m.status === "Paid")
      .reduce((sum, m) => sum + Number(m.fees || 0), 0);

    const today = new Date().toLocaleDateString("en-GB");

    let todaysCollection = 0;

    members.forEach((member) => {
      if (!member.paymentHistory) return;

      member.paymentHistory.forEach((payment) => {
        if (payment.paymentDate === today) {
          todaysCollection += Number(payment.amount || 0);
        }
      });
    });

    res.json({
      totalMembers,
      paidMembers,
      unpaidMembers,
      totalRevenue,
      todaysCollection,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;