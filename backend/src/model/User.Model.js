import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Make sure to import jwt

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    role: { 
        type: String,
        enum: ["admin", "writer", "user"],
        default: "user", 
    },
});

const User = mongoose.model("User", UserSchema);
export default User;
