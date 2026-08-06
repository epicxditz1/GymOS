const Attendance = require("../models/Attendance");
const Member = require("../models/Member");

// ==========================
// Mark Attendance
// ==========================
exports.markAttendance = async (req, res) => {
  try {
    const { memberId, status } = req.body;

    if (!memberId) {
      return res.status(400).json({
        message: "Member is required.",
      });
    }

    const member = await Member.findOne({
      _id: memberId,
      owner: req.user._id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found.",
      });
    }

    const today = new Date().toLocaleDateString("en-GB");

    const existingAttendance = await Attendance.findOne({
      owner: req.user._id,
      member: memberId,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked today.",
      });
    }

    const attendance = await Attendance.create({
      owner: req.user._id,
      member: memberId,
      date: today,
      status: status || "Present",
    });

    res.status(201).json({
      message: "Attendance marked successfully.",
      attendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Today's Attendance
// ==========================
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-GB");

    const attendance = await Attendance.find({
      owner: req.user._id,
      date: today,
    }).populate("member");

    res.status(200).json(attendance);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Member Attendance History
// ==========================
exports.getMemberAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      owner: req.user._id,
      member: req.params.memberId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(attendance);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};