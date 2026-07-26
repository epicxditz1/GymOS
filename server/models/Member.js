const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  membership: {
    type: String,
    required: true,
  },

  fees: {
    type: Number,
    required: true,
  },

  joinDate: {
    type: String,
    required: true,
  },

  expiryDate: {
    type: String,
    required: true,
  },

  attendance: {
  type: String,
  default: "Absent",
},

  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("Member", memberSchema);