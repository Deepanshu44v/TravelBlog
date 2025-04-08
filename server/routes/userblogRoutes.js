const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllBlogs,
  getBlogById,
  replyToCommentUser,
    likeBlog,
    commentOnBlog,
} = require("../controllers/userblogController");

// Public blog routes
router.get("/", getAllBlogs); // All blogs
router.get("/:id", getBlogById); // Blog by ID
router.post("/like/:id", protect, likeBlog);
router.post("/comment/:id", protect, commentOnBlog);
router.post("/:blogId/comments/:commentId/replies", protect, replyToCommentUser);
router.get("/latest/blogs", getAllBlogs); // Fetch latest blogs
module.exports = router;
