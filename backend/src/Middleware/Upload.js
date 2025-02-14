import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/upload')
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname); 
    const uniqueName = uuidv4() + fileExt;
    cb(null, uniqueName);
  }
})

const upload = multer({ 
   storage
})

export default upload;