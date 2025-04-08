import React, { useState } from "react";
import { createBlog } from "../../services/adminblogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("latest");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !category) {
      toast.warn("⚠️ Please fill all fields.");
      return;
    }

    try {
      setUploading(true);
      await createBlog({ title, description, image, category });
      toast.success("🎉 Blog created successfully!");

      // Reset fields
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setCategory("latest");
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error("❌ Failed to create blog. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 sm:p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        📝 Create a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Blog Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Write your blog content..."
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
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
            Blog Image
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
          className={`w-full py-3 font-semibold text-white rounded-lg transition-all ${
            uploading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "🚀 Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
