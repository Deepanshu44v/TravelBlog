const mongoose = require("mongoose");

// Define Reply Schema (for replies to comments)
const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Comment Schema (for comments on destinations)
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Add replies here
});

// Define Destination Schema (for destination data)
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Beach", "Mountain", "City", "Adventure", "Cultural", "Popular"],
    default: "Popular",
  },
  image: {
    type: String,
    required: true, // Cloudinary image URL
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  anonymousLikes: {
    type: Number,
    default: 0,  // Track anonymous likes separately
  },
  comments: [commentSchema],
});

// Export the Destination model
module.exports = mongoose.model("Destination", destinationSchema);
