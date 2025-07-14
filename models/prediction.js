const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  period: { type: String, required: true },
  bigsmall: String,
  color: String,
  number: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", predictionSchema);
