const Destination = require("../models/Destination");

// ✅ Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destinations", error });
  }
};

// ✅ Get destination by ID (with comments and replies populated)
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (err) {
    console.error("Get Destination Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Like/Unlike destination
const likeDestination = async (req, res) => {
  try {
    const userId = req.body.userId;  // Get userId from the request body
    const destinationId = req.params.id;
    console.log(userId);
    console.log(destinationId)
    // Fetch the destination from the database
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Handle anonymous likes (for guests)
    if (!userId) {
      // Check if the destination already has an anonymous like, increase count
      destination.anonymousLikes = (destination.anonymousLikes || 0) + 1;
    } else {
      // Handle logged-in user likes
      const hasLiked = destination.likes.includes(userId);

      if (hasLiked) {
        // Unlike
        destination.likes = destination.likes.filter((id) => id.toString() !== userId);
      } else {
        // Like
        destination.likes.push(userId);
      }
    }

    // Save the updated destination
    await destination.save();

    // Respond with the updated destination object
    res.status(200).json(destination);
  } catch (error) {
    console.error("Error liking destination:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Comment on destination
const commentOnDestination = async (req, res) => {
  const destinationId = req.params.id;
  const userId = req.user._id;
  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    destination.comments.push({
      text: comment,
      user: userId,
    });

    await destination.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", error: err.message });
  }
};

// ✅ Reply to a comment
const replyToDestinationComment = async (req, res) => {
  const { destinationId, commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Reply text is required" });
  }

  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const comment = destination.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies.push({
      text,
      user: req.user._id,
      createdAt: new Date(),
    });

    await destination.save();

    const updatedDestination = await Destination.findById(destinationId)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    res.status(200).json(updatedDestination);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getLatestDestinations = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const latestDestinations = await Destination.find({ createdAt: { $gte: oneWeekAgo } }).sort({ createdAt: -1 });
    res.status(200).json(latestDestinations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching latest destinations" });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
  likeDestination,
  commentOnDestination,
  replyToDestinationComment,
  getLatestDestinations,
};
