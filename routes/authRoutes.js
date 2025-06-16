import express from "express";
import {validateSignUp , validateLogin}  from "../utils/validateUser.js";
import { signUp,login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",validateSignUp,signUp);
router.post("/login",validateLogin,login)

export default router;
