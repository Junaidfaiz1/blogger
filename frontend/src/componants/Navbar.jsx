import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const {logout} = useContext(AuthContext)
  const user = localStorage.getItem("user");
  const persedData = JSON.parse(user);
  const profilePicture = persedData?.profilePicture;
  const role = persedData?.role;
 
  

  return (
    <nav className="bg-gray-200 p-4 shadow-xl rounded-lg flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center w-full">

        {/* Left Side - Logo and Website Name */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdReLeTDjSn6-KVDiVMd4KJ7bE9TPxn82_g&s"
              alt="Logo"
              className="h-8 w-12 rounded-md shadow-inner"
            />
          </Link>
          <span className="text-gray-800 text-lg md:text-xl font-bold">Modern Blog</span>
        </div>

        {/* Right Side - Categories and User Icon */}
        <div className="flex items-center space-x-6">
          {/* Categories */}
          <ul className="flex space-x-4 text-gray-800">
            <Link to={"/:category"}>
              <li className="text-sm md:text-base hover:bg-gray-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">Tech</li>
            </Link>
            <Link to={"/:category"}>
              <li className="text-sm md:text-base hover:bg-gray-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">Lifestyle</li>
            </Link>
            <Link to={"/:category"}>
              <li className="text-sm md:text-base hover:bg-gray-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">Finance</li>
            </Link>
          </ul>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <button 
              className="text-gray-800 text-xl md:text-2xl p-2 rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
            { user?(
              profilePicture?(
                <img
                src={profilePicture}
                alt="Profile"
                className="h-8 w-8 rounded-full shadow-inner object-cover"
              />
              ):(
                <FaUserCircle />
              )
            ):(
              <FaUserCircle />
            )}
                
            
            </button>

            
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-md shadow-xl z-10"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ul className="py-2">
                  {user && (role ==="admin" || role==="writer") &&(
                    <Link to={"/Admin/Dashboard"}>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md shadow-inner">Dashboard</li>
                  </Link>
                )}
                {!user &&(
                  <>
                   <Link to={"/Login"}>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md shadow-inner">Login</li>
                  </Link>
                  <Link to={"/SignUp"}>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md shadow-inner">Sign Up</li>
                  </Link>
                  </>
                )}
                {user &&(
                  <>
                  <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md shadow-inner"
                  onClick={logout}
                  >
                    LogOut
                  </li>
                  </>
                )}
                 
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
