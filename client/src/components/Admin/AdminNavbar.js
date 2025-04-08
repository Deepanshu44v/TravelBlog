import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/admin/dashboard" className="text-xl font-bold">
          Admin Dashboard
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/admin/manage-users" className="hover:text-gray-300">
            Manage Users
          </Link>
          <Link to="/admin/create-blog" className="hover:text-gray-300">
            Create Blog
          </Link>
          <Link to="/admin/create-destination" className="hover:text-gray-300">
            Create Destination
          </Link>
          <Link to="/admin/blogs" className="hover:text-gray-300">
            Blog Management
          </Link>
          <Link to="/admin/destinations" className="hover:text-gray-300">
            Destination Management
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 pb-4">
          <Link to="/admin/manage-users" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
            Manage Users
          </Link>
          <Link to="/admin/create-blog" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
            Create Blog
          </Link>
          <Link to="/admin/create-destination" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
            Create Destination
          </Link>
          <Link to="/admin/blogs" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
            Blog Management
          </Link>
          <Link to="/admin/destinations" className="block py-2 hover:text-gray-300" onClick={toggleMenu}>
            Destination Management
          </Link>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="mt-2 w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
