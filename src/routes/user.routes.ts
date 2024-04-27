import express from "express";
import { UserControllers } from "../controller/user.controller";
import { authenticationMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.post("/", UserControllers.signup);
router.post("/forgot-password",UserControllers.forgotPassword)
router.post("/login",UserControllers.login)
router.post("/fetch-profile",authenticationMiddleware.verifyUser,UserControllers.getProfile)
export default router;
