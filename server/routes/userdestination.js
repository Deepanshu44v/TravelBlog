const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getAllDestinations,
  getDestinationById,
  likeDestination,
  commentOnDestination,
  replyToDestinationComment,
} = require("../controllers/userdestinationController");

// Public destination routes
router.get("/", getAllDestinations); // All destinations
router.get("/:id", getDestinationById); // Destination by ID

// Like destination
router.post("/like/:id", likeDestination);

// Comment on destination
router.post("/comment/:id", protect, commentOnDestination);

// Reply to a comment
router.post(
  "/:destinationId/comments/:commentId/replies",
  protect,
  replyToDestinationComment
);
router.get("/latest/destinations", getAllDestinations);
module.exports = router;
