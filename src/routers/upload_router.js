import express from "express";
import upload from "../middleware/upload_middleware.js";
import {
    uploadAvatar,
} from "../controller/upload_controller.js"

const router = express.Router();

router.post("/uploadAvatar/:id",upload.single('avatar'), uploadAvatar)

export default router