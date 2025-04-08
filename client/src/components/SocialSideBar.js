import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaRedditAlien,
  FaWhatsapp,
  FaPlus,
} from "react-icons/fa";
import { SiMessenger } from "react-icons/si";

const SocialSidebar = () => {
  return (
    <div className="fixed top-1/3 left-0 z-50 flex flex-col items-center space-y-2">
      <a
        href="#"
        className="bg-blue-600 p-2 text-white rounded-r hover:bg-blue-700"
        title="Facebook"
      >
        <FaFacebookF />
      </a>
      <a
        href="#"
        className="bg-sky-400 p-2 text-white rounded-r hover:bg-sky-500"
        title="Twitter"
      >
        <FaTwitter />
      </a>
      <a
        href="#"
        className="bg-blue-700 p-2 text-white rounded-r hover:bg-blue-800"
        title="LinkedIn"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="#"
        className="bg-red-600 p-2 text-white rounded-r hover:bg-red-700"
        title="Pinterest"
      >
        <FaPinterestP />
      </a>
      <a
        href="#"
        className="bg-orange-600 p-2 text-white rounded-r hover:bg-orange-700"
        title="Reddit"
      >
        <FaRedditAlien />
      </a>
      <a
        href="#"
        className="bg-orange-400 p-2 text-white rounded-r hover:bg-orange-500"
        title="Messenger"
      >
        <SiMessenger />
      </a>
      <a
        href="#"
        className="bg-green-500 p-2 text-white rounded-r hover:bg-green-600"
        title="WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="#"
        className="bg-yellow-500 p-2 text-white rounded-r hover:bg-yellow-600"
        title="More"
      >
        <FaPlus />
      </a>
    </div>
  );
};

export default SocialSidebar;
