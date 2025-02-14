import React from "react";


const HomePoster = () => {
  return (
    <div
      className="w-full  bg-cover bg-center flex px-6"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg')", height: "30rem"  }}
    >
      {/* Left Side: Website Description */}
      <div className="w-1/2 flex  items-center">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold leading-snug text-white">
            Welcome to My Website
          </h1>
          <p className="text-lg leading-relaxed text-white">
            Discover insightful blogs, helpful tips, and innovative ideas. Whether you're into technology, health, or lifestyle, we have something for everyone.
          </p>
          <p className="text-md text-white">
            Browse through a world of knowledge and inspiration. Start your journey today!
          </p>
        </div>
      </div>

      {/* Right Side: Search Bar */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Search Blogs
          </h2>

          {/* Professional Search Bar */}
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search blogs by keyword..."
              className="w-full border border-purple-600 rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              className="absolute right-2 bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 focus:ring-2 focus:ring-pink-400"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePoster;
