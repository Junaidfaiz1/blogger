import axios from "axios";
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BLOGCOMMENTS, COMMENT, GETBLOG } from "../constant";
import { ErrorToast, SuccessToast } from "../componants/HandleNotification";
const RelatedPosts = lazy(() => import("../componants/RelatedPosts"));

const Single = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); 
  const [newMessage, setNewMessage] = useState("");
  const [comments, setComments] = useState([]);
 
console.log(comments.flat())
  // Memoize fetchData to prevent re-creation on every render
 // eslint-disable-next-line no-unused-vars
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${GETBLOG}${id}`);
      setData([response.data.data]); // Wrap the single blog object in an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      message: newMessage,
      blogId: id,
    }
    axios.post(COMMENT, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setNewMessage("");
        SuccessToast("Comment submitted successfully!");
        fetchcomments(); // Fetch comments again to update the list
      } else {
        ErrorToast("Failed to submit comment.");
      }
    })
    .catch((error) => {
      ErrorToast("Error submitting comment: " + error.message);
    });
    
  };

  const fetchcomments = useCallback(async () => {
    try {
      const response = await axios.get(`${BLOGCOMMENTS}${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setComments(response.data.data); // Assuming the API returns the comments in this format
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchcomments(); // Fetch comments when the component mounts
    },[fetchcomments])  
    
 

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {data.map((blog, index) => (
        <div key={index} className="lg:w-3/4 w-full bg-gray-200 rounded-xl p-6 shadow-xl flex flex-col">
          {/* Full-width Blog Image */}
          <img
            src={blog.imgurl || "https://via.placeholder.com/600x400"} // Use blog image or a placeholder
            alt="Blog Banner"
            className="w-full h-96 object-cover rounded-lg shadow-inner mb-6"
          />

          {/* Author Information */}
          <div className="flex items-center mt-4 bg-gray-200 p-4 rounded-xl shadow-inner">
            <img
              src={blog.authorProfilePicture || "https://via.placeholder.com/50"} // Use author's avatar or a placeholder
              alt="Author Profile"
              className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-md"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{blog.authorName || "Unknown Author"}</h2>
              <p className="text-gray-500">Published { date || "Unknown Time"}</p>
            </div>
          </div>

          {/* Blog Content */}
          <article className="mt-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">{blog.title || "Untitled Blog"}</h1>
            <p
               className="leading-relaxed mb-4"
               dangerouslySetInnerHTML={{ __html: blog.content || "No content available." }}
            ></p>
          </article>

          {/* Comment Section */}
          <div className="mt-8 bg-gray-300 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Comment</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Message Field */}
              <div>
                <textarea
                  placeholder="Write your message here..."
                  rows="4"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full p-3 bg-gray-400 text-white font-medium rounded-lg shadow-lg hover:bg-gray-500 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display Existing Comments */}
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
              <div className="space-y-4">
              {comments.map((comment, index)=>(
                  <div
                  key={index}
                    className="flex items-start p-4 bg-gray-200 rounded-lg shadow-inner"
                  >
                    <img
                     
                     src={comment.author.profilePicture || "https://via.placeholder.com/50"} // Use author's avatar or a placeholder
                      alt="Commenter Profile"
                      className="w-12 h-12 rounded-full shadow-md"
                    />
                    <div className="ml-4">
                      <h4 className="text-gray-800 font-medium">{comment.author.name}</h4>
                      <p className="text-gray-600 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Related Posts Sidebar */}
      <Suspense fallback={"Loading..."}>
        <div className="lg:w-1/4 w-full mt-8 lg:mt-0 lg:ml-8 bg-gray-200 rounded-xl p-6 shadow-xl">
          <RelatedPosts />
        </div>
      </Suspense>
    </div>
  );
};

export default Single;