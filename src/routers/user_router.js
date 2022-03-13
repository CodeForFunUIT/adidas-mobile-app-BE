import express from "express";
const router = express.Router();
import {
    getAllUser
} from "../controller/user_controller.js"


router.get("/getUsers", getAllUser)

export default router