import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardLink = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-500">Budget Travelling</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-500">Home</Link>
          <Link to="/blogs" className="hover:text-yellow-500">Blogs</Link>
          <Link to="/destinations" className="hover:text-yellow-500">Destinations</Link>
          <Link to="/about" className="hover:text-yellow-500">About</Link>
          <Link to="/contact" className="hover:text-yellow-500">Contact</Link>

          {user && (
            <Link to={dashboardLink} className="hover:text-yellow-500">Dashboard</Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-2 px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/" onClick={closeMenu} className="block hover:text-yellow-500">Home</Link>
          <Link to="/blogs" onClick={closeMenu} className="block hover:text-yellow-500">Blogs</Link>
          <Link to="/destinations" onClick={closeMenu} className="block hover:text-yellow-500">Destinations</Link>
          <Link to="/about" onClick={closeMenu} className="block hover:text-yellow-500">About</Link>
          <Link to="/contact" onClick={closeMenu} className="block hover:text-yellow-500">Contact</Link>

          {user && (
            <Link
              to={dashboardLink}
              onClick={closeMenu}
              className="block hover:text-yellow-500"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="block mt-2 w-full bg-red-500 text-white py-2 rounded text-center hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block mt-2 w-full bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block mt-2 w-full border border-yellow-500 text-yellow-500 py-2 rounded text-center hover:bg-yellow-500 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
