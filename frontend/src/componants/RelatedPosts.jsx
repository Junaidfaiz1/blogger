import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GETBLOG, RELATEDPOSTS } from "../constant";
import axios from "axios";

const RelatedPosts = ({ category }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  console.log("Category in RelatedPosts:", category);
  console.log("RelatedPosts URL:", relatedPosts);
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // Send category as a request body using POST
        const response = await axios.get(`${RELATEDPOSTS}${category}`);

        const data = response.data.data;
        console.log("Related posts data:", data);
        setRelatedPosts(data);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchRelatedPosts();
  }, [category]);

  return (
    <div className="bg-gray-100 rounded-3xl p-6 shadow-xl neomorphic">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Related Posts
      </h3>
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post, index) => (
          <div
            key={index}
            className={`mb-6 pb-6 ${
              index < relatedPosts.length - 1 ? "border-b border-gray-300" : ""
            } hover:shadow-lg transition`}
          >
            <div className="neomorphic-post p-4 rounded-2xl shadow-inner">
              <img
                src={post.imgurl}
                alt="Related post"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700 text-sm mb-4">{post.title}</p>
              <Link to={`/post/${post._id}`}>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:shadow-lg hover:bg-gray-300 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No related posts found.</p>
      )}
    </div>
  );
};

export default RelatedPosts;
