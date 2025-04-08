import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  likeBlog,
  commentOnBlog,
  replyToComment,
} from "../services/userblogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res);
        if (user) {
          setHasLiked(res.likes.includes(user._id));
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        toast.error("Failed to load blog details.");
      }
    };

    if (id) fetchBlog();
  }, [id, user]);

  const handleLike = async () => {
    if (!user || isLiking) return;
    setIsLiking(true);
    try {
      await likeBlog(id, user.token);
      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
      setHasLiked(updatedBlog.likes.includes(user._id));
      toast.success(hasLiked ? "Unliked blog." : "Liked blog!");
    } catch (err) {
      console.error("Error liking blog:", err);
      toast.error("Something went wrong while liking the blog.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await commentOnBlog(id, comment, user.token);
      setComment("");
      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
      toast.success("Comment added!");
    } catch (err) {
      console.error("Error commenting:", err);
      toast.error("Failed to post comment.");
    }
  };

  const handleReply = async (commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText?.trim()) return;
    try {
      await replyToComment(id, commentId, replyText, user.token);
      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply added!");
    } catch (err) {
      console.error("Failed to reply to comment:", err);
      toast.error("Failed to post reply.");
    }
  };

  if (!blog) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            📅 Published on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">{blog.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">👍 {blog.likes?.length || 0}</span>
            <span className="flex items-center gap-1">💬 {blog.comments?.length || 0} Comments</span>
          </div>

          {user ? (
            <div className="mt-6">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center gap-1 px-4 py-1 rounded text-white transition-all ${
                    hasLiked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {hasLiked ? "👎 Unlike" : "👍 Like"}
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-1 px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                >
                  💬 {showComments ? "Hide" : "Comment"}
                </button>
              </div>

              {showComments && (
                <>
                  <div className="mb-4">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full border border-gray-300 rounded p-2"
                      rows="3"
                    ></textarea>
                    <button
                      onClick={handleComment}
                      className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      💬 Submit Comment
                    </button>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Comments:</h3>
                    {blog.comments
                      ?.slice()
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((c) => (
                        <div key={c._id} className="border-b border-gray-200 py-3 text-gray-700">
                          <p className="font-semibold">{c.user?.username || "Anonymous"}:</p>
                          <p className="ml-2">{c.text}</p>
                          <div className="text-xs text-gray-500 ml-2 mb-1">
                            {new Date(c.createdAt).toLocaleDateString()}
                            {c.replies?.length > 0 && (
                              <span className="ml-3 text-blue-500">
                                ↩️ {c.replies.length} repl{c.replies.length > 1 ? "ies" : "y"}
                              </span>
                            )}
                          </div>

                          {/* Replies */}
                          {c.replies?.map((r) => (
                            <div key={r._id} className="ml-6 mt-1 text-sm text-gray-600 border-l-2 pl-2">
                              ↳ <strong>{r.user?.username || "Anonymous"}</strong>: {r.text}
                            </div>
                          ))}

                          {/* Reply Input */}
                          <div className="ml-4 mt-2">
                            <input
                              type="text"
                              placeholder="Write a reply..."
                              className="border border-gray-300 px-2 py-1 rounded text-sm w-full"
                              value={replyInputs[c._id] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [c._id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              onClick={() => handleReply(c._id)}
                              className="mt-1 bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                            >
                              ↩️ Reply
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-6">
              Please{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => (window.location.href = "/login")}
              >
                login
              </span>{" "}
              to like and comment on this blog.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
