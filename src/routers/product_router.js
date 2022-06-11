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
    getProductByCategoryId,
    buyProduct,
    addToBag,
    removeFromBag,
} from "../controller/product_controller.js"
import { getImage } from "../controller/image_controller.js";

const router = express.Router();


router.get("/getProducts",getAllProduct)
router.get("/image/:id", getImage)
router.post("/uploadProduct", upload.array('images', 12), uploadProduct)
router.get("/getSneakerProducts",getSneakerProducts)
router.get("/getShirtProducts",getShirtProducts)
router.get("/getShortProducts",getShortProducts)
router.get("/getTrouserProducts",getTrouserProducts)
router.get("/getProductByCategoryId/:id",getProductByCategoryId)
router.patch("/buyProduct/:id/:size/:color", buyProduct)
router.patch("/likeProduct/:idProd/:idUser",likeProduct)
router.patch("/dislikeProduct/:idProd/:idUser", dislikeProduct)

router.patch("/addToBag/:idProd/:idUser",addToBag)
router.patch("/removeFromBag/:idProd/:idUser", removeFromBag)

export default router