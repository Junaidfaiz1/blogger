import React from 'react';
import { Link } from 'react-router-dom';



const Categories = () => {
  const [blogs, setBlogs] = React.useState([])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/GetBlogByCategory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="p-8 space-y-12">
      {/* Category Heading */}
      <h2 className="text-4xl font-bold text-center text-sea-green-500 mb-8">
        Blog Category
      </h2>

      {blogs.map((blog, index) => (
        <div
          key={blog.id}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } space-y-4 md:space-y-0 md:space-x-4`}
        >
          {/* Image Section */}
          <div className="relative flex-1 w-full h-48 md:h-auto imgback ">
            <img
              src={blog.imageUrl}
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
            <p className="text-gray-700 text-left">
              {blog.description}
            </p>
            <Link to={'/post/:id'} className="mt-4 px-4 py-2 border-2 border-sea-green-500 text-sea-green-500 hover:bg-sea-green-500 hover:text-black rounded-full text-center transition-colors">
              Read Me
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
