import React, {  useState, useEffect } from "react";
import { useQuill } from 'react-quilljs';
import axios from "axios";
import { SuccessToast, ErrorToast } from "../componants/HandleNotification";
import { WRITEBLOG } from "../constant";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogStatus, setBlogStatus] = useState("Draft");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const token = localStorage.getItem("authToken")
  const { quill, quillRef } = useQuill();
  const user = localStorage.getItem("user");
  const userId =JSON.parse(user)?.id;
  
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setBlogContent(quill.root.innerHTML);
      });
    }
 
  }, [quill]);

  const categories = ["Tech", "Lifestyle", "Finance"];
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
 




  const handleSubmit = async (status) => {
    if (!blogTitle || !blogContent || !image || !selectedCategory) {
      return ErrorToast("Please fill out all the required fields!");
    }

   const Payload = {
      title: blogTitle,
      content: blogContent,
      status: status,
      category: selectedCategory,
      image: image,
      user: userId
  
   };
    
    try {
      const response = await axios.post(WRITEBLOG, Payload, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });


      if (response.status === 200 || response.status === 201) {
        SuccessToast(`Blog has been successfully ${status.toLowerCase()}!`);
        resetForm();
      } else {
        ErrorToast(response.data);
      }
    } catch (error) {
      console.error("Request Failed:", error);
      ErrorToast("Failed to connect to the server.");
    }
  };

  const resetForm = () => {
    setBlogTitle("");
    setBlogContent("");
    setImage(null);
    setSelectedCategory(null);
    setBlogStatus("Draft");
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen" style={{ boxShadow: "12px 12px 24px #bebebe, -12px -12px 24px #ffffff" }}>
      <h1 className="text-2xl font-bold text-center mb-8" style={{ textShadow: "2px 2px 4px #d1d1d1" }}>Create Blog</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-gray-200 p-6 rounded-lg" style={{ boxShadow: "inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff" }}>
          <label className="block text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Title</label>
          <input
            type="text"
            placeholder="Enter your blog title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            style={{ background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
          />

          <label className="block text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Content</label>
          <div  ref={quillRef}  style={{ height: "300px", background: "#f0f0f0", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }} />
        </div>

        <div className="col-span-1 bg-gray-200 p-6 rounded-lg" style={{ boxShadow: "inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff" }}>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Status</h3>
            <p className="text-sm bg-gray-300 rounded-lg p-2" style={{ boxShadow: "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff" }}>{blogStatus}</p>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}
              onClick={() => handleSubmit("Published")}
            >
              Publish
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}
              onClick={() => handleSubmit("Draft")}
            >
              Save as Draft
            </button>
          </div>

          <hr className="my-4" style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }} />
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Blog Image</label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg overflow-hidden border" style={{ boxShadow: "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff" }}>
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="text-sm text-gray-500">Click to upload image</p>
                )}
              </div>
            </label>
          </div>
          <hr className="my-4" style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }} />
          <div>
            <h3 className="text-lg font-medium mb-2" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    onChange={() => setSelectedCategory(category)}
                    className="form-radio"
                    style={{ boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff" }}
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

export default CreateBlog;
