// RelatedPosts.jsx
import React from "react";
import { Link } from "react-router-dom";

const RelatedPosts = () => {
  const relatedPosts = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1ibNzaZN83--bmwWByeWv6Uzbnjgbh5m_g&s", // Replace with related post image URL
      description: "Related post description line one and line two",
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1ibNzaZN83--bmwWByeWv6Uzbnjgbh5m_g&s",
      description: "Another related post description line one and line two",
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1ibNzaZN83--bmwWByeWv6Uzbnjgbh5m_g&s",
      description: "Another related post description line one and line two",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1ibNzaZN83--bmwWByeWv6Uzbnjgbh5m_g&s",
      description: "Another related post description line one and line two",
    },
  ];

  return (
    <div className="bg-gray-100 rounded-3xl p-6 shadow-xl neomorphic">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Related Posts</h3>
      {relatedPosts.map((post, index) => (
        <div
          key={post.id}
          className={`mb-6 pb-6 ${index < relatedPosts.length - 1 ? "border-b border-gray-300" : ""} hover:shadow-lg transition`}
        >
          <div className="neomorphic-post p-4 rounded-2xl shadow-inner">
            <img
              src={post.image}
              alt="Related post"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 text-sm mb-4">{post.description}</p>
            <Link to={`/post/${post.id}`}>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-gray-300 transition">
                Read More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedPosts;
