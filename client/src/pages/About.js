import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-br mt-5 from-blue-50 to-white py-16 px-6 md:px-20 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6">
          About WanderWrite 🌍✍️
        </h1>
        <div className="mt-14 bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow">
  <p className="text-xl font-medium text-blue-700 mb-4 text-center">Meet the Creator 💻</p>
  <div className="flex justify-center mb-4">
    <img
      src="../assets/IMG-20250411-WA0002.jpg" // Replace this with your actual image URL
      alt="Site Owner"
      className="w-50 h-50 rounded-full border-4 border-blue-500 shadow-md object-cover"
    />
  </div>
  <p className="text-center text-gray-700">
    I'm a passionate travel enthusiast who built <strong>WanderWrite</strong> to
    connect people through adventure and storytelling.
  </p>
</div>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10">
          WanderWrite is a vibrant travel and blogging platform where wanderlust meets storytelling.
          Whether you're a passionate explorer or a curious reader, our mission is to connect people through
          real travel experiences and captivating blog stories from around the world.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">🌟 What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Inspiring travel blogs from real adventurers</li>
              <li>Beautiful destinations with insider tips</li>
              <li>Interactive platform with likes, comments & replies</li>
              <li>Admin-curated content for the best experience</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">🚀 Our Vision</h2>
            <p className="text-gray-700">
              We believe travel is not just about places, but about the stories we collect and the people we meet. 
              Our goal is to become a digital hub for travelers and writers to share experiences, inspire others,
              and celebrate the spirit of exploration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
