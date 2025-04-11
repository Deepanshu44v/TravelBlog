import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendContactMessage } from "../services/userContactService"; // 👈 your contact service

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      toast.success("Message sent! We'll get back to you soon 😊");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again 😔");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-6">
          Contact Us 📬
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Have a question, suggestion, or just want to say hi? We'd love to hear from you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              Send Message ✉️
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
