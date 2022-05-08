import express from "express";
import { getImage } from "../controller/image_controller.js";
const router = express.Router();
import {
    getAllUser,
    getAvatar,
    uploadAvatar,
    getListFavorites
} from "../controller/user_controller.js"
import upload from "../middleware/upload_middleware.js";


router.get("/getUsers", getAllUser)
router.get("/avatar/:id", getImage)
router.post("/uploadAvatar/:id",upload.single('avatar'), uploadAvatar)
router.get("/getListFavorites/:id",getListFavorites)
export default router