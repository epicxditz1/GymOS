const express = require("express");
const router = express.Router();

const Member = require("../models/Member");
const upload = require("../middleware/upload");

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
    const members = await Member.find().sort({ _id: -1 });

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

    const existingMember = await Member.findById(req.params.id);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

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

module.exports = router;