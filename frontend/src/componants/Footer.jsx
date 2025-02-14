import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-200 p-8 rounded-3xl shadow-lg flex flex-col items-center space-y-6">
      <div className="flex flex-wrap items-center justify-center space-x-6 space-y-6 md:space-y-0 md:flex-nowrap">
        
        {/* Left Side - Website Name and Short Description */}
        <div className="w-full md:w-1/3 text-center md:text-left space-y-2 p-6 rounded-2xl shadow-inner bg-gray-300">
          <h2 className="text-xl font-bold text-gray-700">Modern Blog</h2>
          <p className="text-sm text-gray-600">
            Your source for the latest insights on tech, lifestyle, and finance.
          </p>
        </div>

        {/* Center - Social Media Links */}
        <div className="w-full md:w-1/3 flex justify-center space-x-6 p-6 rounded-2xl shadow-inner bg-gray-300">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl text-gray-600 hover:text-gray-400 transition-transform transform hover:scale-125" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-3xl text-gray-600 hover:text-gray-400 transition-transform transform hover:scale-125" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-gray-600 hover:text-gray-400 transition-transform transform hover:scale-125" />
          </a>
        </div>

        {/* Right Side - Page Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end space-x-6 text-sm text-gray-600">
          <Link  to="/AboutUs" className="hover:text-gray-400 transition-colors">About Us</Link>
          <Link to="/ContactUs" className="hover:text-gray-400 transition-colors">Contact Us</Link>
          <a href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
        </div>

      </div>

      {/* All Rights Reserved Line */}
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Modern Blog. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
