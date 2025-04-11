import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
