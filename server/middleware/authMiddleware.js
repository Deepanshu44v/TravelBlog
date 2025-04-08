const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const dotenv = require("dotenv");
// dotenv.config()
// Middleware to verify token and attach user to request
const protect = async (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  console.log("Authorization header:", req.headers.authorization);

  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.headers.authorization?.split(" ")[1]?.replace(/"/g, '');
  console.log("Extracted token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    console.log("JWT Secret in protect middleware:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ No user found with ID:", decoded.id);
      return res.status(401).json({ message: "User no longer exists" });
    }

    console.log("✅ Authenticated User:", user.username, "| Role:", user.role);
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to check role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
