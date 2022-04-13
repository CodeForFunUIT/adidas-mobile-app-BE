import express from "express";
import multer from "multer";
import {
    uploadAvatar
} from "../controller/upload_controller.js"

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(png|jpg|jfif|jpeg)$/)){
            return callback(new Error('File must be a .jpg|.jfif|.jpeg'))
        }
        callback(undefined, true)
        // callback(undefined, false)
    }
})


router.post("/uploadAvatar/:id",upload.single('avatar'), uploadAvatar)


export default router