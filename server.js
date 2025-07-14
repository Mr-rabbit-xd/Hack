// server.js

const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // .env file config
connectDB();     // MongoDB connection

const app = express();
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", require("./routes/auth"));           // signup, login
app.use("/api/admin", require("./routes/admin"));         // admin panel
app.use("/api/predict", require("./routes/prediction"));  // latest prediction

// ===== Serve static HTML pages =====
app.use(express.static(path.join(__dirname, "public")));  // public folder for HTML, CSS

// ===== Route fallback to index/dashboard if not matched =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Optional: route to login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Optional: route to dashboard page
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Optional: route to admin login
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Optional: route to admin dashboard
app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-dashboard.html"));
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ DV WIN Server running on http://localhost:${PORT}`);
});
