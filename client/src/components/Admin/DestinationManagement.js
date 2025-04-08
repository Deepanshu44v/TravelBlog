import React, { useEffect, useState } from "react";
import {
  getAllDestinations,
  deleteDestination,
  updateDestination,
} from "../../services/admindestinationService";
import DestinationDetailModal from "./DestinationDetailModal";
import DestinationEditModal from "./DestinationEditModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [editingDestination, setEditingDestination] = useState(null);

  const fetchDestinations = async () => {
    try {
      const res = await getAllDestinations();
      setDestinations(res);
    } catch (err) {
      toast.error("❌ Failed to fetch destinations.");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDestination(id);
        toast.success("✅ Destination deleted successfully.");
        fetchDestinations();
      } catch (err) {
        toast.error("❌ Failed to delete destination.");
      }
    }
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
  };

  const handleDetailView = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModals = () => {
    setSelectedDestination(null);
    setEditingDestination(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-emerald-800">
        🌍 Destination Management
      </h2>

      {destinations.length === 0 ? (
        <p className="text-center text-gray-500">No destinations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              onClick={() => handleDetailView(dest)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
            >
              <img
                src={dest.image || "/default-image.jpg"}
                alt={dest.name || "Destination"}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold truncate text-blue-900">
                  {dest.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  🧭 {dest.category} | ❤️ {dest.likes?.length || 0} Likes | 💬{" "}
                  {dest.comments?.length || 0} Comments
                </p>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(dest);
                    }}
                    className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-200"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(dest._id);
                    }}
                    className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={handleCloseModals}
        />
      )}

      {/* Edit Modal */}
      {editingDestination && (
        <DestinationEditModal
          destination={editingDestination}
          onClose={handleCloseModals}
          onUpdate={updateDestination}
          onUpdated={fetchDestinations}
        />
      )}
    </div>
  );
};

export default DestinationManagement;
