import React, { useEffect, useState } from "react";
import {
  deleteDestinationComment,
  getDestinationById,
  replyToDestinationComment,
} from "../../services/admindestinationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DestinationDetailModal = ({ destination: initialDestination, onClose }) => {
  const [destination, setDestination] = useState(initialDestination);
  const [replyInputs, setReplyInputs] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock scroll on open
    const fetchFullDestination = async () => {
      try {
        const fullDestination = await getDestinationById(initialDestination._id);
        setDestination(fullDestination);
      } catch (error) {
        toast.error("❌ Failed to fetch destination data");
      }
    };
    fetchFullDestination();

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll
    };
  }, [initialDestination._id]);

  const handleReplySubmit = async (destinationId, commentId, text) => {
    if (!text || !text.trim()) return;
    try {
      await replyToDestinationComment(destinationId, commentId, text);
      const updated = await getDestinationById(destinationId);
      setDestination(updated);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("✅ Reply posted");
    } catch (err) {
      toast.error("❌ Failed to post reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDestinationComment(destination._id, commentId);
      const updated = await getDestinationById(destination._id);
      setDestination(updated);
      toast.success("🗑️ Comment deleted");
    } catch (err) {
      toast.error("❌ Failed to delete comment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-2 py-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full relative overflow-y-auto max-h-[95vh] animate-fadeIn transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-700 hover:text-red-500 focus:outline-none"
          aria-label="Close Modal"
        >
          ×
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Image */}
          <img
            src={destination.image}
            alt={destination.name}
            className="rounded-lg w-full h-48 sm:h-64 md:h-72 object-cover mb-6"
          />

          {/* Destination Info */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-2">
            {destination.name}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-3 text-sm sm:text-base text-gray-600 mb-6">
            <span>📂 <strong>Category:</strong> {destination.category}</span>
            <span>❤️ <strong>Likes:</strong> {destination.likes?.length || 0}</span>
            <span>💬 <strong>Comments:</strong> {destination.comments?.length || 0}</span>
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              All Comments:
            </h4>

            {destination.comments?.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet.</p>
            ) : (
              destination.comments.map((c) => (
                <div
                  key={c._id}
                  className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 transition hover:shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm sm:text-base">
                      <strong className="text-green-700">
                        {c.user?.username || "User"}:
                      </strong>{" "}
                      {c.text}
                    </p>
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-sm text-red-600 hover:underline focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Replies */}
                  {c.replies?.map((r) => (
                    <div
                      key={r._id}
                      className="ml-4 mt-2 border-l-2 border-green-200 pl-3 text-sm text-gray-700"
                    >
                      ↳ <strong>{r.user?.username || "User"}:</strong> {r.text}
                    </div>
                  ))}

                  {/* Reply Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReplySubmit(destination._id, c._id, replyInputs[c._id]);
                    }}
                    className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
                      className="text-sm bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 transition focus:outline-none"
                    >
                      Reply
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailModal;
