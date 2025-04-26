const Blog = require("../models/Blogs");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

// 🚀 Get all blogs
// 🔥 Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No main image provided" });
    }

    // Function to upload using stream
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "travel-blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await streamUpload(); // Upload the main image

    const blog = new Blog({
      title,
      description,
      category,
      image: result.secure_url, // Cloudinary image URL
      createdBy: req.user.id, // User ID from authenticated user
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const uploadBlogImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "travel-blogs/description-images" }, // Separate folder if you want
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Blog Image Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// module.exports = { uploadBlogImage };

// module.exports = { createBlog };

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("createdBy", "name email role")
      .populate("likes", "name email") // Optional: to show who liked
      .populate("comments.user", "username"); // Optional: who commented
    // console.log(blogs);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};
// 🚀 Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update fields
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.category = category || blog.category;

    // Handle image update
    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "travel-blogs" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      blog.image = result.secure_url;
    }

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚀 Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

const deleteCommentFromBlog = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments = blog.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await blog.save();
    res.status(200).json({ message: "Comment deleted", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
};
// controllers/adminblogController.js
const getBlogById = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id)
      .populate("comments.user", "username")
      .populate("createdBy", "username");

    // Manually populate replies.user in each comment
    blog = blog.toObject(); // convert to plain object

    const User = require("../models/User");

    const populatedComments = await Promise.all(
      blog.comments.map(async (comment) => {
        const populatedReplies = await Promise.all(
          (comment.replies || []).map(async (reply) => {
            const user = await User.findById(reply.user, "username");
            return { ...reply, user };
          })
        );
        return { ...comment, replies: populatedReplies };
      })
    );

    blog.comments = populatedComments;

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching blog" });
  }
};

const addReplyToComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      user: req.user._id,
      text,
    });

    await blog.save();

    const updatedBlog = await Blog.findById(blogId)
      .populate("comments.user", "username")
      .populate("comments.replies.user", "username");

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error adding reply", error: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
  deleteCommentFromBlog,
  getBlogById,
  addReplyToComment,
  uploadBlogImage,
};
