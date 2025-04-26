const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
  deleteCommentFromBlog,
  addReplyToComment,
  uploadBlogImage,
} = require("../controllers/adminblogController");

// Create Blog (Already done)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createBlog
);

// 👇 Add these routes:
router.get("/", protect, authorizeRoles("admin"), getAllBlogs);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  updateBlog
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBlog);
router.delete(
  "/:blogId/:commentId",
  protect,
  authorizeRoles("admin"),
  deleteCommentFromBlog
);
router.post(
  "/reply/:blogId/:commentId",
  protect,
  authorizeRoles("admin", "user"), // both can reply
  addReplyToComment
);

router.get("/:id", protect, authorizeRoles("admin"), getBlogById); // Optional: to get a blog by ID

router.post("/upload-blog-image",protect,authorizeRoles("admin"),upload.single("file"),uploadBlogImage);
module.exports = router;
