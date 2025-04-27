import React, { useCallback, useRef } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROFILE } from '../constant';
import { FaPerson } from "react-icons/fa6";

const UpdateProfileDesign = () => {
    const imgref = useRef(null);
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('authToken');
 
    const fetchUserData =  async () => {
        try {
            const response = await axios.get(PROFILE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           
                setUserData(response.data.data);
                
           
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    
    const HandleImageChange = () => {
        imgref.current.click();
    }

    const HandleImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setUserData({ ...userData, profileImage: base64String });
            };
            reader.readAsDataURL(file);
        }
    }


  
    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-200 rounded-lg my-4" style={{ boxShadow: "12px 12px 24px #bebebe, -12px -12px 24px #ffffff" }}>
            <div className="flex justify-between items-center mb-8">
                <input type="file" accept="image/*" onChange={HandleImage} ref={imgref} className="hidden" />
                <h1 className="text-2xl font-bold text-gray-800" style={{ textShadow: "2px 2px 4px #d1d1d1" }}>Profile</h1>
                {userData.profileImage && userData.profileImage !== "" ? (
                    <img
                        src={userData.profileImage}
                        onClick={HandleImageChange}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border cursor-pointer"
                        style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}
                    />
                ) : (
                    <div
                    onClick={HandleImageChange}
                    className="w-24 h-24 rounded-full border cursor-pointer flex items-center justify-center p-2"
                    style={{
                        boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                        background: "#f0f0f0",
                    }}
                >
                    <FaPerson className="w-12 h-12 text-gray-600" />
                </div>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Name</label>
                <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="Enter your name"
                    id="name"
                    className="mt-2 block w-full rounded-md shadow-sm sm:text-lg border border-gray-300 p-3"
                    style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Email</label>
                <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="Enter your email"
                    id="email"
                    className="mt-2 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm sm:text-lg p-3 cursor-not-allowed"
                    style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                    readOnly
                />
            </div>

            <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Role</label>
                <input
                    type="text"
                    value={userData.role}
                    id="role"
                    className="mt-2 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm sm:text-lg p-3 cursor-not-allowed"
                    style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                    readOnly
                />
            </div>

            <div className="flex justify-center mt-8">
                <button
                    type="button"
                    className="px-6 py-3 text-lg font-medium rounded-md"
                    
                    style={{
                        color: "#000000",
                        background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                        boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = "4px 4px 8px #ffffff, -4px -4px 8px #bebebe"}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = "4px 4px 8px #bebebe, -4px -4px 8px #ffffff"}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default UpdateProfileDesign;
