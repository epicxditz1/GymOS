require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const memberRoutes = require("./routes/memberRoutes");

const app = express();


app.use(cors());
app.use(express.json());
app.options("/api/members/*", (req, res) => {
  console.log("OPTIONS request received");
  res.sendStatus(204);
});
app.use("/api/members", memberRoutes);

app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("🚀 GymOS Backend Running");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to GymOS API 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
