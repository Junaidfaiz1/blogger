import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import Router from "./src/Routes/Routes.js";
import db from "./src/Config/ConnectDB.js";
import cors from "cors";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

db();
app.use("/api", Router);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
