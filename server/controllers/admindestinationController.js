const Destination = require("../models/Destination");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/User");

// 🚀 Create Destination
const createDestination = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "travel-destinations" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    const destination = new Destination({
      name,
      description,
      category,
      image: result.secure_url,
      createdBy: req.user.id,
    });

    await destination.save();
    res.status(201).json({ message: "Destination created successfully", destination });
  } catch (err) {
    console.error("Create Destination Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🚀 Get All Destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("createdBy", "name email role")
      .populate("likes", "name email")
      .populate("comments.user", "username");

    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
};

// 🚀 Get Destination by ID with Populated Comments and Replies
const getDestinationById = async (req, res) => {
  try {
    let destination = await Destination.findById(req.params.id)
      .populate("comments.user", "username")
      .populate("createdBy", "username");

    destination = destination.toObject();

    const populatedComments = await Promise.all(
      destination.comments.map(async (comment) => {
        const populatedReplies = await Promise.all(
          (comment.replies || []).map(async (reply) => {
            const user = await User.findById(reply.user, "username");
            return { ...reply, user };
          })
        );
        return { ...comment, replies: populatedReplies };
      })
    );

    destination.comments = populatedComments;

    res.json(destination);
  } catch (err) {
    console.error("Error fetching destination by ID:", err);
    res.status(500).json({ error: "Error fetching destination" });
  }
};

// 🚀 Update Destination
const updateDestination = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const destination = await Destination.findById(req.params.id);

    if (!destination) return res.status(404).json({ message: "Destination not found" });

    destination.name = name || destination.name;
    destination.description = description || destination.description;
    destination.category = category || destination.category;

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "travel-destinations" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      destination.image = result.secure_url;
    }

    await destination.save();
    res.json({ message: "Destination updated", destination });
  } catch (err) {
    console.error("Update Destination Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚀 Delete Destination
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete destination" });
  }
};

// 🚀 Delete Comment
const deleteCommentFromDestination = async (req, res) => {
  try {
    const { destinationId, commentId } = req.params;
    const destination = await Destination.findById(destinationId);

    if (!destination) return res.status(404).json({ message: "Destination not found" });

    destination.comments = destination.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await destination.save();
    res.status(200).json({ message: "Comment deleted", destination });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
};

// 🚀 Add Reply to Comment
const addReplyToComment = async (req, res) => {
  const { destinationId, commentId } = req.params;
  const { text } = req.body;

  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const comment = destination.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      user: req.user._id,
      text,
    });

    await destination.save();

    const updatedDestination = await Destination.findById(destinationId)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    res.status(200).json(updatedDestination);
  } catch (err) {
    res.status(500).json({ message: "Error adding reply", error: err.message });
  }
};

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  deleteCommentFromDestination,
  addReplyToComment,
};
