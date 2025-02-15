
import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
import Router from "./src/Routes/Routes.js";
import db from "./src/Config/ConnectDB.js";
import cors from 'cors';
import pkg from 'cloudinary'; 
const { v2: cloudinary } = pkg; 


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();


const whitelist = process.env.whitelist;

const corsOptions = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) ||!origin){
            callback(null, true);
        }else{
            callback(new Error("Not Allowed By Cors"))
        }
    }
}

app.use(express.json());
app.use(cors(corsOptions));


db();
app.use("/api",Router)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
