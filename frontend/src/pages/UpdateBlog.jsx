import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
    const [Status, setStatus] = useState("Draft");
    const [title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = ["Tech", "LifeStyle", "Finance"];
    const { id } = useParams();
    const Navigate = useNavigate();

    const Handleimagechange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:8000/api/GetBlog/${id}`);
            const data = result.data.data;
            setContent(data.content);
            setTitle(data.title);
            setStatus(data.status);
            setImage(data.imgurl);
            setSelectedCategory(data.category);
        };

        fetchData();
    }, [id]);

    const HandleSubmit = async (status) => {
        if (!title || !selectedCategory || !Content || !image) {
            return window.alert("Please fill out all fields");
        } else {
            const data = new FormData();
            data.append('title', title);
            data.append("content", Content);
            data.append("status", Status);
            data.append("category", selectedCategory);
            if (image) {
                data.append("image", image);
            }
            try {
                await axios.put(`http://localhost:8000/api/UpdateBlog/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },

                });
                alert("Blog updated successfully!");
                Navigate("/Admin/Dashboard");
            } catch (error) {
                console.error("Error updating blog:", error);
                alert("Failed to update the blog. Please try again.");
            }
        }
    };

    return (
        <div className='p-6 min-h-screen' style={{ background: "#e0e0e0", boxShadow: "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff" }}>
            <h1 className='text-center font-bold text-2xl mb-8' style={{ textShadow: "2px 2px 4px #d1d1d1" }}>Update Blog</h1>

            <div className='grid grid-cols-4 gap-4'>
                <div className='col-span-3 p-6 rounded-lg' style={{ background: "#e0e0e0", boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}>
                    <label className='text-lg font-medium mb-2 block' style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Title</label>
                    <input
                        type="text"
                        placeholder='Enter Blog Title Here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full p-3 rounded-lg mb-4'
                        style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                    />

                    <label className='block font-medium mb-2 text-lg' style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Content</label>
                    <div
                        value={Content}
                        onChange={(content) => setContent(content)}
                        style={{ height: "300px", background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
                        className='mb-4 rounded-lg'
                    />
                </div>

                <div className='col-span-1 p-6 rounded-lg' style={{ background: "#e0e0e0", boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Status</h3>
                        <p className="text-lg p-2 rounded-lg" style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>{Status}</p>
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <button
                            className='px-4 py-2 rounded-lg'
                            style={{
                                color: "#fff",
                                background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                                boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                                transition: "0.3s",
                            }}
                            onClick={() => HandleSubmit("Published")}
                        >
                            Publish
                        </button>

                        <button
                            className='px-4 py-2 rounded-lg'
                            style={{
                                color: "#fff",
                                background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                                boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                                transition: "0.3s",
                            }}
                            onClick={() => HandleSubmit("Draft")}
                        >
                            Save as Draft
                        </button>
                    </div>

                    <label className='block text-lg font-medium mb-2' style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Image</label>
                    <input
                        type="file"
                        className='hidden'
                        accept='image/*'
                        id='upload-image'
                        onChange={Handleimagechange}
                    />
                    <label htmlFor="upload-image" className='cursor-pointer mb-4'>
                        <div className='h-32 flex items-center justify-center rounded-lg overflow-hidden border' style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>
                            {image ? (
                                typeof image === 'string' ? (
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                )
                            ) : (
                                <p className="text-sm text-gray-500">Click to upload image</p>
                            )}
                        </div>
                    </label>

                    <div>
                        <h3 className='text-lg font-medium mb-2' style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Select Category</h3>
                        <div className='flex flex-col gap-2'>
                            {categories.map((category, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name='category'
                                        value={category}
                                        checked={selectedCategory === category}
                                        onChange={() => setSelectedCategory(category)}
                                        className='form-radio mr-2'
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;
