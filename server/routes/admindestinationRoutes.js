const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  deleteCommentFromDestination,
    addReplyToComment,  
} = require("../controllers/admindestinationController");

// ✅ Create Destination
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createDestination
);

// ✅ Get all destinations
router.get("/", protect, authorizeRoles("admin"), getAllDestinations);

// ✅ Update destination
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  updateDestination
);

// ✅ Delete destination
router.delete("/:id", protect, authorizeRoles("admin"), deleteDestination);

// ✅ Get destination by ID
router.get("/:id", protect, authorizeRoles("admin"), getDestinationById);

// ✅ Delete comment from a destination
router.delete(
  "/:destinationId/:commentId",
  protect,
  authorizeRoles("admin"),
  deleteCommentFromDestination
);

// ✅ Reply to a comment (admin or user)
router.post(
  "/reply/:destinationId/:commentId",
  protect,
  authorizeRoles("admin", "user"),
  addReplyToComment
);

module.exports = router;
