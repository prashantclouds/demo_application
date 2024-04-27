import express from "express";
import { UserControllers } from "../controller/user.controller";

const router = express.Router();

router.post("/", UserControllers.signup);
router.post("/forgot-password",UserControllers.forgotPassword)
router.post("/login",UserControllers.login)
export default router;
