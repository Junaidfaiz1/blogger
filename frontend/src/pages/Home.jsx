import React from 'react';
import { Link } from 'react-router-dom';
import Poster from '../componants/Poster';


const blogs = [
  {
    id: 1,
    title: "First Blog Title",
    description: "This is a short description of the first blog.",
    buttonLabel: "Read Me",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WMhXwy-kuSo-JSwo1HUhRXytpyJg-hcmPQ&s"
  },
  {
    id: 2,
    title: "Second Blog Title",
    description: "This is a short description of the second blog.",
    buttonLabel: "Read Me",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJQoJz43Wn0GDoejJ-khBPD8AfG6yA9sBVw&s"
  },
  {
    id: 3,
    title: "Third Blog Title",
    description: "This is a short description of the third blog.",
    buttonLabel: "Read Me",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WMhXwy-kuSo-JSwo1HUhRXytpyJg-hcmPQ&s"
  },
  {
    id: 4,
    title: "Fourth Blog Title",
    description: "This is a short description of the fourth blog.",
    buttonLabel: "Read Me",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WMhXwy-kuSo-JSwo1HUhRXytpyJg-hcmPQ&s"
  },
];


const HomePage = () => {
  
  return (
    <>
    <Poster/>
    <div className="p-8 space-y-12">
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
            <Link to={'/post/:id'} className="mt-4 px-4 py-2 border-2 border-teal-500  hover:bg-sea-green-500 hover:text-rose-600 rounded-full text-center transition-colors">
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
