import express from "express";
import { getImage } from "../controller/image_controller.js";
const router = express.Router();
import {
    getAllUser,
    getAvatar,
    uploadAvatar,
    getListFavorites,
    addUserAddress,
    getUserAddress,
    updateUserAddress,
} from "../controller/user_controller.js"
import upload from "../middleware/upload_middleware.js";


router.get("/getUsers", getAllUser)
router.get("/avatar/:id", getImage)
router.post("/uploadAvatar/:id",upload.single('avatar'), uploadAvatar)
router.get("/getListFavorites/:id",getListFavorites)
router.post("/addUserAddress/:id",addUserAddress)
router.get("/getUserAddress/:id",getUserAddress)
router.patch("/updateUserAddress/:id",updateUserAddress)
export default router