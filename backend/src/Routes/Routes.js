import express from "express";
const Router = express.Router();
import authenticateUser from "../Middleware/Authuser.js";
import {
  CreateBlog,
  GetWriterBlogs,
  GetBlogById,
  UpdateBlog,
  DeleteBlog,
  GetBlogByCategory,
  RelatedPosts,
  Categories,
  SendVerificationCode,
  SignUp,
  Login,
  GetHomeBlogs,
  updateProfile,
  CommentOnBlog,
  Profile,
  CommentOnSpecificBlog,
} from "../Controller/Blog.Controller.js";

Router.post("/createblog", authenticateUser, CreateBlog);
Router.get("/GetWriterBlogs", authenticateUser, GetWriterBlogs);
Router.delete("/DeleteBlog/:id", authenticateUser, DeleteBlog);
Router.put("/UpdateBlog/:id", authenticateUser, UpdateBlog);
Router.get("/GetBlog/:id", GetBlogById);
Router.get("/GetBlogByCategory/:category", GetBlogByCategory);
Router.get("/GetHomeBlogs", GetHomeBlogs);
Router.post("/varificationcode", SendVerificationCode);
Router.post("/signup", SignUp);
Router.post("/login", Login);
Router.get("/categories", Categories);
Router.post("/comment", authenticateUser, CommentOnBlog);
Router.get("/showblogcomments/:id", CommentOnSpecificBlog); // Get comments for a specific blog
Router.delete("/deletecomment/:id", authenticateUser, CommentOnSpecificBlog); // Delete a specific comment
Router.get("/profile", authenticateUser, Profile); // Get user profile
Router.put("/updateprofile", authenticateUser, updateProfile); // Update user profile
Router.get("/relatedposts/:category", RelatedPosts);

export default Router;
