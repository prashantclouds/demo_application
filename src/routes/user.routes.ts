import express from "express";
import { UserControllers } from "../controller/user.controller";

const router = express.Router();

router.post("/", UserControllers.signup);

export default router;
