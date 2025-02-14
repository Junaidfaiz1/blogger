import React from "react";
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-gray-100 p-6 md:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-stretch space-y-6 md:space-y-0 md:space-x-6">
        
        {/* Left Side - Contact Information */}
        <div className="w-full md:w-1/2 bg-gray-200 p-6 rounded-2xl shadow-inner flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center md:text-left">Contact Information</h2>
          <p className="text-gray-600 text-sm mb-6 text-center md:text-left">
            Feel free to reach out via phone or email. We’d love to hear from you!
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-300 rounded-xl shadow-inner flex items-center">
              <FaPhoneAlt className="text-gray-700 mr-3 text-lg" />
              <span className="text-gray-600">+123-456-7890</span>
            </div>
            <div className="p-4 bg-gray-300 rounded-xl shadow-inner flex items-center">
              <FaEnvelope className="text-gray-700 mr-3 text-lg" />
              <span className="text-gray-600">contact@modernblog.com</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 bg-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-md transition-all"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 bg-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-md transition-all"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 bg-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-md transition-all"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 bg-gray-200 p-6 rounded-2xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center md:text-left">Send Us a Message</h2>
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 bg-gray-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700"
              />
            </div>
            
            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 bg-gray-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700"
              />
            </div>

            {/* Subject Field */}
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-4 bg-gray-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full p-4 bg-gray-100 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700"
              ></textarea>
            </div>

            {/* Send Button */}
            <div>
              <button
                type="submit"
                className="w-full p-4 bg-gray-300 text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-md hover:bg-gray-400 transition-all"
              >
                Send Mail
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
