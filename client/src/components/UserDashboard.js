import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      {/* You can enable Navbar if needed */}
      {/* <Navbar /> */}
      <Home />

      <div className="p-6 max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Welcome, {user.username ? user.username : "Traveler"}! 👋
        </h2>
        <p className="text-gray-600 mb-6">
          Discover inspiring blogs and breathtaking destinations curated just for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Link
            to="/blogs"
            className="bg-yellow-100 p-6 rounded shadow hover:bg-yellow-200 transition text-lg font-medium"
          >
            📚 View Blogs
          </Link>
          <Link
            to="/destinations"
            className="bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition text-lg font-medium"
          >
            🌍 View Destinations
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
