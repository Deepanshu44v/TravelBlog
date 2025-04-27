import React, { useEffect, useState } from "react";
import {
  deleteBlogComment,
  getBlogById,
  replyToComment,
} from "../../services/adminblogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import Blogs from "../../../../server/models/Blogs";

const BlogDetailModal = ({ blog: initialBlog, onClose }) => {
  const [blog, setBlog] = useState(initialBlog);
  const [replyInputs, setReplyInputs] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFullBlog = async () => {
      try {
        const fullBlog = await getBlogById(initialBlog._id);
        setBlog(fullBlog);
      } catch (error) {
        console.error("Failed to fetch full blog data", error);
        toast.error("Failed to load blog details");
      }
    };
    fetchFullBlog();
  }, [initialBlog._id]);

  const handleReplySubmit = async (blogId, commentId, text) => {
    if (!text || !text.trim()) {
      toast.warning("Reply cannot be empty");
      return;
    }

    try {
      await replyToComment(blogId, commentId, text);
      const updated = await getBlogById(blogId);
      setBlog(updated);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply added successfully");
    } catch (err) {
      console.error("Error replying to comment:", err);
      toast.error("Failed to add reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteBlogComment(blog._id, commentId);
      const updated = await getBlogById(blog._id);
      setBlog(updated);
      toast.success("Comment deleted successfully");
    } catch (err) {
      console.error("Failed to delete comment", err);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start md:items-center px-4 py-6 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-black"
        >
          ×
        </button>

        {/* 📸 Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg w-full h-60 sm:h-64 object-cover mb-6"
        />

        {/* 📝 Title & Description */}
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
          {blog.title}
        </h2>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {children}
                </a>
              ),
            }}
          >
            {blog.description}
          </ReactMarkdown>

        {/* 📊 Metadata */}
        <div className="text-sm text-gray-600 mb-6 flex flex-wrap gap-4">
          <span>📂 <strong>Category:</strong> {blog.category}</span>
          <span>❤️ <strong>Likes:</strong> {blog.likes?.length + blog.anonymousLikes || 0}</span>
          <span>💬 <strong>Comments:</strong> {blog.comments?.length || 0}</span>
        </div>

        {/* 💬 Comments */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800">All Comments:</h4>

          {blog.comments?.length === 0 && (
            <p className="text-gray-500 italic">No comments yet.</p>
          )}

          {blog.comments?.map((c) => (
            <div
              key={c._id}
              className="border border-gray-200 rounded-lg p-3 mb-4 bg-gray-50"
            >
              {/* Main Comment */}
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-800">
                  <strong className="text-blue-700">
                    {c.user?.username || "User"}:
                  </strong>{" "}
                  {c.text}
                </p>
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>

              {/* Replies */}
              {c.replies?.map((r) => (
                <div
                  key={r._id}
                  className="ml-4 mt-2 border-l-2 border-gray-300 pl-3 text-sm text-gray-600"
                >
                  ↳ <strong>{r.user?.username || "User"}:</strong> {r.text}
                </div>
              ))}

              {/* Reply Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(blog._id, c._id, replyInputs[c._id]);
                }}
                className="mt-3 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="flex-1 border px-3 py-1 rounded text-sm"
                  value={replyInputs[c._id] || ""}
                  onChange={(e) =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [c._id]: e.target.value,
                    }))
                  }
                />
                <button
                  type="submit"
                  className="text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Reply
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailModal;
