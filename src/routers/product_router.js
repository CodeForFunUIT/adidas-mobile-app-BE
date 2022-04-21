import express from "express";
import upload from "../middleware/upload_middleware.js";
import {
    dislikeProduct,
    getAllProduct,
    getShirtProducts,
    getShortProducts,
    getSneakerProducts,
    getTrouserProducts,
    likeProduct,
    uploadProduct,
} from "../controller/product_controller.js"
import { getImage } from "../controller/image_controller.js";

const router = express.Router();


router.get("/getProducts",getAllProduct)
router.get("/image/:id", getImage)
router.post("/uploadProduct", upload.single('image'), uploadProduct)
router.get("/getSneakerProducts",getSneakerProducts)
router.get("/getShirtProducts",getShirtProducts)
router.get("/getShortProducts",getShortProducts)
router.get("/getTrouserProducts",getTrouserProducts)
router.patch("/likeProduct/:idProd/:idUser",likeProduct)
router.patch("/dislikeProduct/:idProd/:idUser", dislikeProduct)

export default router