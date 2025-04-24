import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GETBLOGBYCATEGORY } from '../constant';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Categories = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${GETBLOGBYCATEGORY}${category}`);
      if (response.status === 200) {
        setBlogs(response.data.data);
      } else {
        console.error('Failed to fetch blogs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return (
    <div className="p-8 space-y-12">
      {/* Category Heading */}
      <h2 className="text-4xl font-bold text-center text-sea-green-500 mb-8">
        {category} Blogs
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } space-y-4 md:space-y-0 md:space-x-4`}
          >
            {/* Image Section */}
            <div className="relative flex-1 w-full h-48 md:h-auto imgback">
              <img
                src={blog.imgurl || 'https://via.placeholder.com/600x400'} // Use blog image or a placeholder
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
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content.length > 400
                      ? blog.content.substring(0, 400) + '...'
                      : blog.content,
                }}
                className="text-gray-700 text-left"
              ></p>
              <Link
                to={`/post/${blog._id}`}
                className="mt-4 px-4 py-2 border-2 border-sea-green-500 text-sea-green-500 hover:bg-sea-green-500 hover:text-black rounded-full text-center transition-colors"
              >
                Read Me
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Blogs Found</p>
      )}
    </div>
  );
};

export default Categories;