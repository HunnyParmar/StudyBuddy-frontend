import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4 mt-10 rounded-t-full mx-60 sm:px-6 lg:px-24" id="help">
      <div className="max-w-screen-lg mx-auto text-center">
        {/* Logo */}
        <div className="mb-6">
          <span className="text-3xl font-bold">
            Study<span className="text-gray-400">Buddy</span>
          </span>
        </div>

        {/* Contact and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-6 text-center md:text-left">
          {/* Contact */}
          <div>
            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-2">
              <FaEnvelope className="text-gray-300" /> contact@studybuddy.com
            </p>
            <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-gray-300" /> +91 932 567 1890
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-transform transform hover:scale-110">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-transform transform hover:scale-110">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-transform transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-400 text-xs mb-4">
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs text-center">2025 © Knowledge Collective</p>
      </div>
    </footer>
  );
};

export default Footer;
