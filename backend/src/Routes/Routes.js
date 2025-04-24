import express from "express";
const Router = express.Router();
import authenticateUser from "../Middleware/Authuser.js";
import { CreateBlog, GetWriterBlogs, GetBlogById, UpdateBlog, DeleteBlog, 
    GetBlogByCategory, Categories, SendVerificationCode, SignUp, Login} from "../Controller/Blog.Controller.js";




Router.post("/createblog",authenticateUser, CreateBlog)
Router.get("/GetWriterBlogs",authenticateUser, GetWriterBlogs);
Router.delete("/DeleteBlog/:id",authenticateUser, DeleteBlog);
Router.put("/UpdateBlog/:id",authenticateUser, UpdateBlog);
Router.get("/GetBlog/:id", GetBlogById);
Router.get("GetBlogByCategory/:Category", GetBlogByCategory);

Router.get("/categories", Categories);
Router.post("/varificationcode", SendVerificationCode)
Router.post("/signup", SignUp)
Router.post("/login", Login)




export default Router;
