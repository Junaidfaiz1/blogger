import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Poster from '../componants/Poster';
import axios from 'axios';
import { HomeBlogs } from '../constant';





const HomePage = () => {
  const [blogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    try {
     const response = await axios.get(HomeBlogs);
      if (response.status === 200) {
        setBlogs(response.data.data); 
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }
  
  useEffect(() => {
    fetchBlogs();
  }
  , []); // Fetch blogs when the component mounts
  return (
    <>
    <Poster/>
    <div className="p-8 space-y-12">
      {blogs.map((blog, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } space-y-4 md:space-y-0 md:space-x-4`}
        >
          {/* Image Section */}
          <div className="relative flex-1 w-full h-48 md:h-auto imgback ">
            <img
              src={blog.imgurl}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg imgfront"
            />
            <div className="absolute inset-0 bg-sea-green-500 opacity-70 md:opacity-50 mix-blend-multiply"></div>
          </div>
          
          {/* Title, Description, and Button Section */}
          <div className="flex-1 p-4 flex flex-col justify-center md:items-center">
            <h1 className="text-2xl font-semibold text-center md:text-left mb-2">
              {blog.title}
            </h1>
            <p d dangerouslySetInnerHTML={{
                  __html:
                    blog.content.length > 400
                      ? blog.content.substring(0, 400) + '...'
                      : blog.content,
                }} className="text-gray-700 text-left">
              
            </p>
            <Link to={`/post/${blog._id}`} className="mt-4 px-4 py-2 border-2 border-teal-500  hover:bg-sea-green-500 hover:text-rose-600 rounded-full text-center transition-colors">
              Read Me
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default HomePage;
