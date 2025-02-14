import express from "express";
const Router = express.Router();
import authenticateUser from "../Middleware/Authuser.js";
import { CreateBlog, GetAllBlog, GetBlogById, UpdateBlog, DeleteBlog, 
    GetBlogByCategory, Categories, SendVerificationCode, SignUp, Login, Test} from "../Controller/Blog.Controller.js";
import authRoles from "../Middleware/authrole.js";
import upload from "../Middleware/Upload.js";

Router.post("/createblog/",upload.single("image"), CreateBlog);
Router.get("/AllBlog/", GetAllBlog);
Router.get("/GetBlog/:id", GetBlogById);
Router.put("/UpdateBlog/:id", UpdateBlog);
Router.delete("/DeleteBlog/:id", DeleteBlog);
Router.get("GetBlogByCategory/:Category", GetBlogByCategory);
Router.get("/categories", Categories);
Router.post("/varificationcode", SendVerificationCode)
Router.post("/signup", SignUp)
Router.post("/login", Login)
Router.get("/test",authenticateUser,authRoles("admin"), Test)



export default Router;
