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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    const fetchData = async () => {
      try {
        const res = await getDestinationById(id);
        setDestination(res);
        if (user) setHasLiked(res.likes.includes(user._id));
      } catch {
        toast.error("Failed to fetch destination");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, user]);

  useEffect(() => {
    if (showComments) {
      setTimeout(() => {
        document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showComments]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    const userId = user?.id;
    try {
      if (userId) {
             await likeDestination (id, userId, user.token);
           } else {
             await likeDestination(id);  // Anonymous like
           } 
      // await likeDestination(id, userId, user.token);
      const updated = await getDestinationById(id);
      setDestination(updated);
      setHasLiked(updated.likes.includes(userId));
      toast.success(user ? "Liked!" : "Liked anonymously!");
    } catch {
      toast.error("Failed to like destination");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!user) return toast.error("Please login to comment.");
    if (!comment.trim()) return;
    try {
      await commentOnDestination(id, comment, user.token);
      setComment("");
      const updated = await getDestinationById(id);
      setDestination(updated);
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  const handleReply = async (commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText?.trim()) return;
    try {
      await replyToDestinationComment(id, commentId, replyText, user.token);
      const updated = await getDestinationById(id);
      setDestination(updated);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply added!");
    } catch {
      toast.error("Failed to post reply");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!destination) return <div className="text-center mt-10">Destination not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg  mt-10 overflow-hidden">
        <img src={destination.image} width={500} height={500} alt={destination.name} className="object-cover" />
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            🗓️ Added on {new Date(destination.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{destination.name}</h1>
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
              {destination.description}
            </ReactMarkdown>

          <div className="mb-4 text-sm text-gray-600">
            📍 <span className="bg-gray-200 px-3 py-1 rounded-full">{destination.category}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>👍 {destination.likes.length + (destination.anonymousLikes || 0)}</span>
            <span>💬 {destination.comments.length}</span>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`px-4 py-1 rounded text-white transition ${
                hasLiked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
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
              {user && (
                <div className="mb-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border border-gray-300 rounded p-2"
                    rows={3}
                  ></textarea>
                  <button
                    onClick={handleComment}
                    className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    💬 Submit Comment
                  </button>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Comments:</h3>
                {destination.comments.map((c) => (
                  <div key={c._id} className="border-b py-3">
                    <p className="font-semibold">{c.user?.username || "Anonymous"}:</p>
                    <p className="ml-2">{c.text}</p>
                    <div className="text-xs text-gray-500 ml-2 mb-2">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>

                    {c.replies?.map((r) => (
                      <div key={r._id} className="ml-6 pl-2 border-l text-sm text-gray-600">
                        ↳ <strong>{r.user?.username || "Anonymous"}</strong>: {r.text}
                      </div>
                    ))}

                    {user && (
                      <div className="ml-4 mt-2">
                        <input
                          type="text"
                          value={replyInputs[c._id] || ""}
                          onChange={(e) => setReplyInputs({ ...replyInputs, [c._id]: e.target.value })}
                          placeholder="Write a reply..."
                          className="w-full border border-gray-300 rounded p-1 text-sm"
                        />
                        <button
                          onClick={() => handleReply(c._id)}
                          className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          ↩️ Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!user && (
            <p className="text-sm text-gray-500 mt-6">
              Please{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                login
              </span>{" "}
              to comment on this destination.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
