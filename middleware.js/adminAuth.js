const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
}

module.exports = adminAuth;
