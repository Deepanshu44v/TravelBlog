import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaRedditAlien,
  FaWhatsapp,
  FaPlus,
  FaInstagram,
} from "react-icons/fa";
import { SiMessenger } from "react-icons/si";

const SocialSidebar = () => {
  return (
    <div className="fixed top-1/3 left-0 z-50 flex flex-col items-center space-y-2">
      <a
        href="https://www.facebook.com/profile.php?id=100033917357654"
        className="bg-blue-600 p-2 text-white rounded-r hover:bg-blue-700"
        title="Facebook"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/nomadic_rishab_?igsh=MWc1ZHVzcnZsbTliYg=="
        className="bg-pink-500 p-2 text-white rounded-r hover:bg-red-600"
        title="instagram"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=100033917357654"
        className="bg-yellow-500 p-2 text-white rounded-r hover:bg-yellow-600"
        title="More"
      >
        <FaPlus />
      </a>
    </div>
  );
};

export default SocialSidebar;
