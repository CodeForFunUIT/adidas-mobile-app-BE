import express from "express";
const router = express.Router();

import {
  uploadBanner,
  getAllBanner,
} from "../controller/banner_controller.js";

router.post("/uploadBanner", uploadBanner);
router.get("/getAllBanner",getAllBanner)


export default router;