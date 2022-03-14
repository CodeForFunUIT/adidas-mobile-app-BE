import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  signup,
  verifyEmail,
//   verityEmail,
//   loginWithFaceBook,
//   changePassword,
//   sendOTPEmail,
//   changePw,
  logOut,
} from "../controller/auth_controller.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/signup", signup);
router.get("/verify/:uniqueString", verifyEmail)
// router.get("/verifyEmail", verityEmail);
// router.post("/loginFB", loginWithFaceBook);
// router.post("/changePass", changePassword);
// router.post("/sendOTP", sendOTPEmail);
// router.post("/verifyOTP", verifyOTP);
// router.post("/changePw", changePw);
router.post("/logOut", logOut);

export default router;