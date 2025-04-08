import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../../services/adminblogService";
import EditBlogModal from "./EditBlogModal";
import BlogDetailModal from "./BlogDetailModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (deleting) return;
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setDeleting(true);
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully!");
        fetchBlogs();
      } catch (error) {
        toast.error("Failed to delete blog.");
        console.error("Delete error:", error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-800">
        📝 Blog Management
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No blogs available yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border cursor-pointer flex flex-col"
              onClick={() => setSelectedBlog(blog)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
                <p className="text-sm text-gray-500 mt-1 italic">Category: {blog.category}</p>
                <div className="mt-2 text-sm text-gray-700">
                  ❤️ Likes: {blog.likes?.length || 0}
                </div>
                <div className="text-sm text-gray-700">💬 Comments: {blog.comments?.length || 0}</div>

                <div className="mt-auto flex justify-end gap-2 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBlog(blog);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(blog._id);
                    }}
                    disabled={deleting}
                    className={`${
                      deleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    } text-white px-4 py-1.5 rounded-md text-sm transition`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
          onUpdated={fetchBlogs}
        />
      )}

      {/* Detail Modal */}
      {selectedBlog && (
        <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default BlogManagement;
