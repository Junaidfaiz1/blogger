import { log } from "console";
import mongoose from "mongoose";

const db = async () => { 
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database not connected", err);
        
        
    }
};
export default db;