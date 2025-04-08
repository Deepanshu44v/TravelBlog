import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/userblogService';
import BlogCard from '../components/BlogCard';
import {toast} from 'react-toastify';
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [categoryOption, setCategoryOption] = useState("all");
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
        const uniqueCategories = ["all", ...new Set(data.map(blog => blog.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        toast.error("Failed to load blogs. Please try again later.");
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...blogs];

      if (categoryOption !== "all") {
        result = result.filter(blog => blog.category === categoryOption);
      }

      switch (sortOption) {
        case "latest":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "oldest":
          result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "popular":
          result.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
          break;
        default:
          break;
      }

      setFilteredBlogs(result);
    };

    applyFilters();
  }, [blogs, sortOption, categoryOption]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <br />
      <br />
      <br />
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">📚 All Blogs</h2>

        <div className="flex gap-4">
          {/* Category Filter */}
          <select
            value={categoryOption}
            onChange={(e) => setCategoryOption(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found for selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
