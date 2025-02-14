import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    content:{
        type: String,
        required: true,
        default: "",
    },
    category:{
        type: String,
        enum: ["Tech", "LifeStyle", "Finance"],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status:{
        type: String,
        enum: ["Published", "Draft"],
        default: "Draft"
    },
    imgurl: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Blog = mongoose.model("Blog", BlogSchema)
export default Blog;