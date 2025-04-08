import React, { useState } from "react";
import { createDestination } from "../../services/admindestinationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Popular");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Beach",
    "Mountain",
    "City",
    "Adventure",
    "Cultural",
    "Popular",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image || !category) {
      toast.warn("⚠️ Please fill in all fields.");
      return;
    }

    try {
      setUploading(true);
      await createDestination({ name, description, category, image });

      toast.success("✅ Destination created successfully!");

      // Clear form
      setName("");
      setDescription("");
      setCategory("Popular");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating destination:", err);
      toast.error("❌ Failed to create destination.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 sm:p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        🗺️ Create Destination
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Destination Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter destination name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the destination..."
            className="w-full h-32 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
            Destination Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full bg-white border rounded-lg px-3 py-2"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg shadow-md max-h-60 object-cover w-full"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 font-semibold text-white rounded-lg transition-all duration-300 ${
            uploading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {uploading ? "Uploading..." : "🌄 Create Destination"}
        </button>
      </form>
    </div>
  );
};

export default CreateDestination;
