import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  verifyEmail,
//   verityEmail,
//   loginWithFaceBook,
//   changePassword,
//   sendOTPEmail,
//   changePw,
  logOut,
  checkEmail,
} from "../controller/auth_controller.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify/:uniqueString", verifyEmail)
// router.post("/loginFB", loginWithFaceBook);
// router.post("/changePass", changePassword);
// router.post("/sendOTP", sendOTPEmail);
// router.post("/verifyOTP", verifyOTP);
// router.post("/changePw", changePw);
router.patch("/logOut/:id", logOut);
router.get("/checkEmail/:id",checkEmail)


export default router;