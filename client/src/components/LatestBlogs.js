import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchLatestBlogs } from "../services/userblogService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const latest = await fetchLatestBlogs();
        setBlogs(latest);
        toast.success("Latest blogs loaded! ✍️");
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
        toast.error("Failed to load latest blogs.");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
        📘 Latest Blogs (This Week)
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <span role="img" aria-label="books" className="text-5xl mb-4 block">
            📚
          </span>
          <p className="text-lg">No new blogs added this week. Check again soon!</p>
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
