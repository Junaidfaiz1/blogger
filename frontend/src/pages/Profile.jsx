import React from 'react';

const UpdateProfileDesign = () => {
    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-200 rounded-lg my-4" style={{ boxShadow: "12px 12px 24px #bebebe, -12px -12px 24px #ffffff" }}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800" style={{ textShadow: "2px 2px 4px #d1d1d1" }}>Profile</h1>
                <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border cursor-pointer"
                    style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Name</label>
                <input
                    type="text"
                    id="name"
                    className="mt-2 block w-full rounded-md shadow-sm sm:text-lg border border-gray-300 p-3"
                    style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Email</label>
                <input
                    type="email"
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
                    id="role"
                    value="Admin"
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
                        color: "#fff",
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
