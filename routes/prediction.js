const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

// Get latest prediction
router.get("/latest", async (req, res) => {
  try {
    const latest = await Prediction.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch {
    res.status(500).json({ message: "Failed to fetch prediction" });
  }
});

module.exports = router;
