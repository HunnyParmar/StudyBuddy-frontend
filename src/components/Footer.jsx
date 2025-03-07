import React from 'react'
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
    FaPhone,
  } from "react-icons/fa";
const Footer = () => {
  return (
    <>
       <footer className="bg-gray-900 text-white pt-8 pb-4 mt-10 rounded-t-full mx-60" id="help">
        <div className="container mx-auto text-center">
          <div className="mb-4 flex justify-center items-center space-x-2">
            <span className="text-3xl font-bold">
              Study<span className="text-gray-400">Buddy</span>
            </span>
          </div>
          {/*  */}
          
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between w-full mt-5 mb-4">
            <div className="text-center md:text-left ml-30">
              <p className="text-gray-400 flex items-center gap-3 mb-2">
                <FaEnvelope className="text-gray-300" /> contact@studybuddy.com
              </p>
              <p className="text-gray-400 flex items-center gap-3">
                <FaPhone className="text-gray-300" /> +91 932 567 1890
              </p>
            </div>

            <div className="flex space-x-9 mt-4 md:mt-0 mr-30">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center space-x-6 text-gray-400 text-xs mb-3">
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>

          <p className="text-gray-500 text-xs">2025 © Knowledge Collective</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
