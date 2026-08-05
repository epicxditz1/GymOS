const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const attendanceController = require("../controllers/attendanceController");

// ==========================
// Mark Attendance
// ==========================
router.post(
  "/",
  authMiddleware,
  attendanceController.markAttendance
);

// ==========================
// Today's Attendance
// ==========================
router.get(
  "/today",
  authMiddleware,
  attendanceController.getTodayAttendance
);

// ==========================
// Member Attendance History
// ==========================
router.get(
  "/member/:memberId",
  authMiddleware,
  attendanceController.getMemberAttendance
);

module.exports = router;