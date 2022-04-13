import express from "express";
const router = express.Router();
import {
    getAllUser,
    getAvatar
} from "../controller/user_controller.js"


router.get("/getUsers", getAllUser)
router.get("/getAvatar/:id", getAvatar)

export default router