import React, { useState } from "react";
import { updateBlog } from "../../services/adminblogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlogModal = ({ blog, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    category: blog.category,
  });
  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (newImage) {
      data.append("image", newImage);
    }

    try {
      await updateBlog(blog._id, data, true);
      toast.success("✅ Blog updated successfully!");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("❌ Failed to update blog.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          ✏️ Edit Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>

          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow transition"
            >
              ✅ Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded shadow transition"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
