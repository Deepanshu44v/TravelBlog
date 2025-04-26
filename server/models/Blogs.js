const mongoose = require("mongoose");

// const mongoose = require("mongoose");

// Define Reply Schema
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

// Extend Comment Schema to include replies
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
  replies: [replySchema], // 👈 Add replies here
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Cloudinary URL
    required: true,
  },
  category: {
    type: String,
    enum: ["latest", "oldest", "popular"],
    default: "latest",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Blog", blogSchema);