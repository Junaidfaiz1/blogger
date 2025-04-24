import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from "../componants/SideBar"; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SuccessToast, ErrorToast } from "../componants/HandleNotification";
import { DELETEBLOG, GETWRITERBLOGS } from '../constant';

function Dashboard() {
  const [Form, setForm] = useState([]);
  const token = localStorage.getItem('authToken');

  // Memoize fetchBlogs to prevent re-creation on every render
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(GETWRITERBLOGS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data; // Assuming the API returns an array of blogs
      setForm(data.data);
    } catch (error) {
      ErrorToast("Error fetching blogs: " + error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // Include fetchBlogs in the dependency array

  const handleDelete = (blogId) => {
    try {
      axios.delete(`${DELETEBLOG}${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setForm((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
          SuccessToast("Blog deleted successfully!");
        } else {
          ErrorToast("Failed to delete the blog.");
        }
      })
      .catch((error) => {
        ErrorToast("Error deleting blog: " + error.message);
      });
    } catch (error) {
      ErrorToast("Error deleting blog: " + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-5 ml-64"> {/* Ensuring sidebar spacing */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Blog List */}
        <div className="space-y-4">
          {Form.map((blog, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              {/* Blog Title */}
              <div className="text-lg font-semibold text-gray-700 truncate">
                {blog.title}
              </div>
              <div className="text-lg font-semibold text-gray-700 truncate">
                {blog.status}
              </div>

              {/* Action Buttons and Blog Views */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <Link to={`/post/${blog._id}`} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  View
                </Link>
                <Link to={`/Admin/Update/${blog._id}`} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <div className="text-gray-500">
                  Views
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;