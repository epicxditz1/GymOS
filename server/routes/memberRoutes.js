const express = require("express");
const router = express.Router();

const Member = require("../models/Member");

// Save Member
router.post("/", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    const member = new Member(req.body);
    await member.save();

    res.status(201).json({
      message: "✅ Member Saved Successfully",
      member,
    });
  } 
  catch (error) {
  console.error("❌ FULL ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
});
// Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ _id: -1 });

    res.status(200).json(members);
  } catch (error) {
    console.error("❌ Error Fetching Members:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// Delete Member
router.delete("/:id", async (req, res) => {
  console.log("DELETE ID:", req.params.id);

  try {
    await Member.findByIdAndDelete(req.params.id);

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
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

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
// Update Member
router.put("/:id", async (req, res) => {
 console.log("PUT ID:", req.params.id);
 console.log("=== PUT ROUTE HIT ===");

try {
  console.log("REQ BODY:", req.body);
  const existingMember = await Member.findById(req.params.id);

  console.log("Old Status:", existingMember.status);
  console.log("New Status:", req.body.status);
    if (
  existingMember.status === "Unpaid" &&
  req.body.status === "Paid"
) {
  req.body.paymentHistory = [
    ...(existingMember.paymentHistory || []),
    {
      amount: req.body.fees,
      paymentDate: new Date().toLocaleDateString("en-GB"),
      paymentMethod: req.body.paymentMethod,
    },
  ];
}
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Updated Member:", updatedMember);

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
module.exports = router;