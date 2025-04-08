const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/adminControllers");
const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminControllers");

// Admin only routes
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);
router.put("/:id/role", protect, authorizeRoles("admin"), updateUserRole);
router.get("/dashboard-stats", protect, authorizeRoles("admin"), getDashboardStats);

module.exports = router;
