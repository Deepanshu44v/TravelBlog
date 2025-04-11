import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">Budget Travelling 🌍</h2>
          <p className="text-sm text-gray-300">
            Explore the world through our travel stories and guides. Adventure awaits!
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-300">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-green-400">Blogs</Link></li>
            <li><Link to="/destinations" className="hover:text-green-400">Destinations</Link></li>
            <li><Link to="/about" className="hover:text-green-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-3 text-green-300">Get in Touch</h3>
          <p className="text-sm text-gray-300">Email: contact@travelblog.com</p>
          <p className="text-sm text-gray-300 mb-4">Phone: +123 456 7890</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-green-400">🌐</a>
            <a href="#" className="hover:text-green-400">📸</a>
            <a href="#" className="hover:text-green-400">🐦</a>
            <a href="#" className="hover:text-green-400">📘</a>
          </div>
        </div> */}
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} BudgetTravelling.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
