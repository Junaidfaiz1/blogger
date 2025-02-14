import React, { useState } from 'react';
import Sidebar from "../componants/SideBar"; // Ensure this path is correct
import { Link } from 'react-router-dom';

function Dashboard() {
  // Dummy data for blogs
  const [Form, setForm] = useState([
    { _id: "1", title: "How to Start a Business", views: 120 },
    { _id: "2", title: "The Future of AI in Web Development", views: 95 },
    { _id: "3", title: "10 Tips for Better SEO", views: 75 },
  ]);

  // Function to delete a blog (removes from dummy state)
  const handleDelete = (blogId) => {
    setForm((prevForm) => prevForm.filter((blog) => blog._id !== blogId));
    alert('Blog deleted successfully');
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
          {Form.map((data) => (
            <div
              key={data._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              {/* Blog Title */}
              <div className="flex-grow text-lg font-semibold text-gray-700 truncate">
                {data.title}
              </div>

              {/* Action Buttons and Blog Views */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <Link to={`/post/${data._id}`} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  View
                </Link>
                <Link to={`/Admin/Update/${data._id}`} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(data._id)} 
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <div className="text-gray-500">
                  {data.views} Views
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
