"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const router = express_1.default.Router();
router.post("/", user_controller_1.UserControllers.signup);
router.post("/forgot-password", user_controller_1.UserControllers.forgotPassword);
router.post("/login", user_controller_1.UserControllers.login);
router.post("/fetch-profile", authentication_middleware_1.authenticationMiddleware.verifyUser, user_controller_1.UserControllers.getProfile);
exports.default = router;
