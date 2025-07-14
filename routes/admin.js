const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Key = require("../models/Key");
const Prediction = require("../models/Prediction");

const JWT_SECRET = process.env.JWT_SECRET;

// Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
});

// Create Key
router.post("/key", async (req, res) => {
  const { key } = req.body;
  try {
    const exists = await Key.findOne({ key });
    if (exists) return res.status(400).json({ message: "Key exists" });
    await Key.create({ key });
    res.json({ message: "Key created" });
  } catch {
    res.status(500).json({ message: "Failed to create key" });
  }
});

// Get all keys
router.get("/keys", async (req, res) => {
  const keys = await Key.find();
  res.json(keys);
});

// Delete key
router.delete("/key/:id", async (req, res) => {
  await Key.findByIdAndDelete(req.params.id);
  res.json({ message: "Key deleted" });
});

// Submit Prediction
router.post("/predict", async (req, res) => {
  const { period, bigsmall, color, number } = req.body;
  try {
    await Prediction.create({ period, bigsmall, color, number });
    res.json({ message: "Prediction saved" });
  } catch {
    res.status(500).json({ message: "Prediction save failed" });
  }
});

module.exports = router;
