import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/AdminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalDestinations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Failed to fetch dashboard statistics");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📊 Admin Dashboard
      </h1>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link
          to="/admin/manage-users"
          className="bg-white border-t-4 border-blue-500 rounded-lg shadow hover:shadow-lg p-6 transition duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-700">👤 Total Users</h2>
          <p className="text-4xl font-bold text-blue-600 mt-3">
            {stats.totalUsers}
          </p>
        </Link>

        <Link
          to="/admin/blogs"
          className="bg-white border-t-4 border-yellow-500 rounded-lg shadow hover:shadow-lg p-6 transition duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-700">📚 Total Blogs</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-3">
            {stats.totalBlogs}
          </p>
        </Link>

        <Link
          to="/admin/destinations"
          className="bg-white border-t-4 border-green-500 rounded-lg shadow hover:shadow-lg p-6 transition duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            🌍 Total Destinations
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.totalDestinations}
          </p>
        </Link>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/create-blog"
          className="flex items-center justify-between bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded shadow transition"
        >
          ➕ Create Blog
        </Link>

        <Link
          to="/admin/create-destination"
          className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded shadow transition"
        >
          🗺️ Create Destination
        </Link>

        <Link
          to="/admin/manage-users"
          className="flex items-center justify-between bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded shadow transition"
        >
          👥 Manage Users
        </Link>

        <Link
          to="/admin/blogs"
          className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded shadow transition"
        >
          📝 Manage Blogs
        </Link>

        <Link
          to="/admin/destinations"
          className="flex items-center justify-between bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 rounded shadow transition"
        >
          🌍 Manage Destinations
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
