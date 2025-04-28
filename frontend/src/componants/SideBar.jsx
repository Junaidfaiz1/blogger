import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { PROFILE } from "../constant";
import { ErrorToast } from "./HandleNotification";

function Sidebar() {
  const [userData, setUserData] = useState({});
  console.log("userData", userData);
  const token = localStorage.getItem("authToken");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.data);
      
    } catch (error) {
      ErrorToast("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); 

  return (
    <div className="bg-gray-100 text-gray-800 h-full w-64 flex flex-col items-center py-5 space-y-6 fixed inset-y-0 left-0 shadow-lg rounded-3xl transition-all duration-300 ease-in-out">
      {/* Profile Section */}
     
        <div  className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-xl">
          <img
            className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-md"
            src={userData.profilePicture || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <h2 className="text-lg font-semibold text-gray-700">{userData.name}</h2>
        </div>
      
      {/* Navigation Links */}
      <div className="flex flex-col w-full mt-6 space-y-3">
        <Link
          to="/Admin/profile"
          className="block w-full px-4 py-2 text-center font-medium text-gray-700 rounded-xl bg-gray-200 shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Profile
        </Link>
        <Link
          to="/Admin/createblog"
          className="block w-full px-4 py-2 text-center font-medium text-gray-700 rounded-xl bg-gray-200 shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Create Blog
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
