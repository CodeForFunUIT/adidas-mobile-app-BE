import express from "express";
import {
    createCategory,
    getCategorys,
    createTypeCategory,
    getTypeCategorys,
    getCategoryById
} from "../controller/category_controller.js"

const router = express.Router();

router.post("/createCategory", createCategory)
router.get("/getCategorys",getCategorys)
router.get("/getCategoryById/:id", getCategoryById)

router.post("/createTypeCategory", createTypeCategory)
router.get("/getTypeCategorys",getTypeCategorys)

export default router