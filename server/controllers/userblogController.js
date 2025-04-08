const Blog = require("../models/Blogs");
const { find } = require("../models/User");

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username"); // THIS LINE is important

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
// import Blog from "../models/Blog.js";

// Toggle Like
const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id; // Extracted from JWT middleware

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json(blog); // Return updated blog
  } catch (error) {
    console.error("Like toggle failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Add Comment
const commentOnBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user._id;
  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.comments.push({
      text: comment,
      user: userId,
      //   username: user.username
    });

    await blog.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: err.message });
  }
};
const replyToCommentUser = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Reply text is required" });

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      text,
      user: req.user._id,
      createdAt: new Date(),
    });

    await blog.save();
    const updatedBlog = await Blog.findById(blogId)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getLatestBlogs = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const latestBlogs = await Blog.find({ createdAt: { $gte: oneWeekAgo } }).sort({ createdAt: -1 });
    res.status(200).json(latestBlogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching latest blogs" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  likeBlog,
  commentOnBlog,
  replyToCommentUser,
  getLatestBlogs,
};
