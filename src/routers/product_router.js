import express from "express";
import upload from "../middleware/upload_middleware.js";
import {
    getAllProduct,
    uploadProduct,
} from "../controller/product_controller.js"

const router = express.Router();


router.get("/getProducts",getAllProduct)
router.post("/uploadProduct", upload.single('image'), uploadProduct)


export default router