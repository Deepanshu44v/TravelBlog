import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LatestBlogs from "../components/LatestBlogs";
import LatestDestination from "../components/LatestDestination";
import SocialSidebar from "../components/SocialSideBar";
const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1519821172141-b5d8b6c74a3a?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161b89a2d?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1518684079-30b9e0189e4d?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1500&q=80",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <SocialSidebar></SocialSidebar>
      {/* ✅ Image Slider */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt="slider"
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* ✅ Overlay Text */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Explore the World
          </h2>
        </div> */}

        {/* ✅ Arrows */}
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full z-10"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full z-10"
        >
          ›
        </button>
      </div>

      {/* ✅ Dot Indicators */}
      <div className="flex justify-center mt-4 flex-wrap gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
      <LatestBlogs></LatestBlogs>
      <LatestDestination></LatestDestination>

      {/* ✅ Navigation Section */}
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-gray-600 mb-4 mt-8">
          Explore blogs and destinations curated just for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <a
            href="/blogs"
            className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 transition"
          >
            📚 View All Blogs
          </a>
          <a
            href="/destinations"
            className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition"
          >
            🌍 View All Destinations
          </a>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
        Get in Touch with Us 📬
      </h1>
      <p className="text-center text-gray-600">
        Have questions? We’re here to help. Fill out the form below or head over
        to our{" "}
        <Link to="/contact" className="text-blue-500 underline">
          Contact page
        </Link>
        .
      </p>
    </div>
  );
};

export default Home;
