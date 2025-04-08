import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDestinationById,
  likeDestination,
  commentOnDestination,
  replyToDestinationComment,
} from "../services/userdestinationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [comment, setComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await getDestinationById(id);
        setDestination(res);
        setHasLiked(res.likes.includes(user?._id));
      } catch (err) {
        toast.error("Failed to fetch destination");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDestination();
  }, [id]);

  useEffect(() => {
    if (showComments) {
      setTimeout(() => {
        const el = document.getElementById("comments-section");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showComments]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      setHasLiked((prev) => !prev);
      setDestination((prev) => ({
        ...prev,
        likes: hasLiked
          ? prev.likes.filter((id) => id !== user._id)
          : [...prev.likes, user._id],
      }));
      await likeDestination(id, user.token);
    } catch (err) {
      toast.error("Error liking destination");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await commentOnDestination(id, comment, user.token);
      toast.success("Comment added");
      setComment("");
      const updated = await getDestinationById(id);
      setDestination(updated);
    } catch (err) {
      toast.error("Error adding comment");
    }
  };

  const handleReply = async (commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText?.trim()) return;
    try {
      await replyToDestinationComment(id, commentId, replyText, user.token);
      toast.success("Reply added");
      const updated = await getDestinationById(id);
      setDestination(updated);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
    } catch (err) {
      toast.error("Error replying to comment");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!destination) return <div className="text-center mt-10">Destination not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-64 object-cover sm:h-72"
        />
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-500 mb-3">
            🗓️ Added on{" "}
            {new Date(destination.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
            {destination.name}
          </h1>
          <p className="mb-4 text-gray-700">{destination.description}</p>
          <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            📍 {destination.category}
          </span>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-6 mb-2">
            <span>👍 {destination.likes?.length || 0}</span>
            <span>💬 {destination.comments?.length || 0} Comments</span>
          </div>

          {user ? (
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={handleLike}
                  className={`px-4 py-1 rounded text-white ${
                    hasLiked
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {hasLiked ? "👎 Unlike" : "👍 Like"}
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                >
                  💬 {showComments ? "Hide" : "Comment"}
                </button>
              </div>

              {showComments && (
                <div id="comments-section">
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
                    {destination.comments?.map((c) => (
                      <div
                        key={c._id}
                        className="border-b border-gray-200 py-2 text-gray-700"
                      >
                        <p className="font-semibold">
                          {c.user?.username || "Anonymous"}:
                        </p>
                        <p className="ml-2">{c.text}</p>
                        <div className="text-xs text-gray-500 ml-2 mb-1">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </div>

                        {c.replies?.map((r) => (
                          <div
                            key={r._id}
                            className="ml-6 mt-1 text-sm text-gray-600 border-l-2 pl-2"
                          >
                            ↳ <strong>{r.user?.username || "Anonymous"}</strong>:{" "}
                            {r.text}
                          </div>
                        ))}

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
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-6">
              Please{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                login
              </span>{" "}
              to like and comment on this destination.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
