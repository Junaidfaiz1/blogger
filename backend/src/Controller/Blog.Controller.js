
import slugify from "slugify";
import Blog from "../model/Blog.Model.js";
import Comment from "../model/Comments.Model.js";
import User from "../model/User.Model.js";
import SuccessResponse from "../Middleware/ApiResponse.js";
import ApiError from "../Middleware/ErrorHandler.js";
import cloudinary from "../Middleware/Cloudnary.js";
import fs from "fs"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

const verificationCodes = new Map();
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "he630001@gmail.com",
    pass: "wvqo otea ixvu ykdu",
  },
});

export const SendVerificationCode = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!role) {
      return res.status(400).json({ message: "Select Role" });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    verificationCodes.set(email, code);
    const mailOptions = {
      from: process.env.MAIL,
      to: role === "admin" ? process.env.MAIL : email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending verification code" });
  }
};

export const SignUp = async (req, res) => {
  try {
    const { name, email, password, verificationCode, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }
    const storedVerification = verificationCodes.get(email);
    if (!storedVerification) {
      return res.status(400).json({
        message: "Verification code has expired or is invalid",
      });
    }
    if (verificationCode != storedVerification) {
      return res.status(400).json({
        message: "Verification code is invalid",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ,
    });
    await newUser.save();
    verificationCodes.delete(email);
    res.status(201).json({
      success: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      error: error.message
    });
  }
};


export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter Email and Password",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not Registered. Please SignUp",
      });
    }

   
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      process.env.JWT_SECRET || SECRET_KEY,
      { expiresIn: '12h' } 
    );

    const user = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      profilePicture: existingUser.profilePicture,
      role: existingUser.role
    }

    return res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    return next(
      res.status(500).json({
        error: error.message,
      })
    );
  }
};

export const Test = async (req, res, next )=>{
  res.status(200).json({
    message: "Hellow world"
  })
}


  

export const CreateBlog = async (req, res) => {
  try {
    const { title, content, category, author, status } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
        status: 400,
      });
    }   
    const filePath = req.file.path;
   const result = await cloudinary.uploader.upload(filePath,{
      folder: "Blog"
    });
    const blog = new Blog({
      title,
      content,
      category,
      author,
      status,
      imgurl: result.secure_url,
    });
    fs.unlinkSync(filePath);
    
    await blog.save();  
    return res.status(201).json({
      success: "Blog Created Successfully",
      blog,
    }); 
    
  } catch (error) {
    return res.status(500).json({
      message: "Error creating blog: " + error.message,
    });
  }
};


export const GetAllBlog = async (req, res, next) => {
    try {
        const blog = await Blog.find();
        return SuccessResponse(res, blog, "Blog retrieved successfully");
    } catch (error) {
        next(new ApiError(500, "Server is not responding"));
    }
};

export const GetBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }
        return SuccessResponse(res, blog, "Blog retrieved by ID successfully");
    } catch (error) {
        next(res.status(500).json({
            message: "error to responding server"
        }));
    }
};

export const UpdateBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, content, category, imgurl, author, status } = req.body;
  
      // Check if the blog exists
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      let imageUrl = imgurl;
  
      // Handle file upload for image
      if (req.file) {
        // Delete old image from Cloudinary if it exists
        if (blog.imgurl) {
          const existingPublicId = blog.imgurl.split("/").pop().split(".")[0]; // Extract public_id
          await cloudinary.uploader.destroy(existingPublicId);
        }
  
        // Generate a slugified name for the new image
        const img_name = slugify(title || blog.title, { lower: true, strict: true });
  
        // Upload the new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog",
          public_id: img_name,
          allowed_formats: ["jpeg", "jpg", "png"],
        });
  
        // Delete the local file
        await fs.unlink(req.file.path);
  
        // Update the imageUrl
        imageUrl = uploadResult.secure_url;
      }
      const updateBlog = { title,
        content,
        category,
        imgurl: imageUrl,
        author,
        status,}
  
      // Update the blog document
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId, updateBlog,
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

export const DeleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            throw res.status(500).json({
                message: "Blog not found"
            });
        }

        // Remove the image from Cloudinary
        const publicId = blog.imgurl.split("/").slice(-2).join("/").split(".")[0]; // Extract the public_id
        await cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error("Error deleting image from Cloudinary: ", error);
            }
        });

        // Delete the blog from the database
        await blog.deleteOne();
        return SuccessResponse(res, null, "Blog deleted successfully");
    } catch (error) {
        next(res.status(500).json({
            message: "Error deleting blog: " + error.message
        }));
    }
};


export const GetBlogByCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        const blog = await Blog.find({ category, status: "Published" });
        if (blog.length === 0) {
            return next(new ApiError(404, "Blog not found"));
        }
        return SuccessResponse(res, blog, "Blog retrieved by category successfully");
    } catch (error) {
        return next(new ApiError(400, "Error retrieving blog by category"));
    }
};

export const GetBlogByAuthor = async (req, res, next) => {
    try {
        const author = req.params.author;
        const blog = await Blog.find({ author, status: "Published" });
        if (blog.length === 0) {
            return next(new ApiError(404, `${author} has not published anything`));
        }
        return SuccessResponse(res, blog, `${author}'s blogs retrieved successfully`);
    } catch (error) {
        next(new ApiError(400, "Error retrieving this author's blogs"));
    }
};

export const BlogComment = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const { content, authorId } = req.body;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }
        const comment = new Comment({
            content,
            author: authorId,
            blog: blogId
        });
        await comment.save();
        return SuccessResponse(res, comment, "New comment added to this blog");
    } catch (error) {
        next(new ApiError(400, "Error commenting on blog"));
    }
};

export const CommentOnSpecificBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ blog: blogId })
            .populate('author', 'name profilePicture')
            .exec();
        
        return SuccessResponse(res, comments, "Comments on the specific blog retrieved successfully");
    } catch (error) {
        next(new ApiError(400, "Error retrieving comments for this blog"));
    }
};

export const Categories = async(req, res, next)=>{
    try {
        const categories = await Blog.distinct("category");
        res.status(200).json({
            message: "Categories fetched successfully",
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            message: "Internal server error",
            error: error
        })
    }
}
