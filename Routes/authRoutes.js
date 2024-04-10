import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);
// router.post("/reset/password", authController.resetPassword);
// router.post("/forgotpassword", authController.forgotPassword);
// router.post("/verifyotp", authController.verifyOTP);

export default router;
