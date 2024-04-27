"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const result = yield user_service_1.User.Signup(payload);
                if (result) {
                    return res.status(200).send("User creted successfully");
                }
                else {
                    return res.status(400).send("something went wrong");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const result = yield user_service_1.User.loginService(payload);
                if (result) {
                    return res.status(200).send(result);
                }
                else {
                    return res.status(400).send("something went wrong");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const result = yield user_service_1.User.forgotPssswordService(email);
                if (result) {
                    return res.status(200).send("email send successfully");
                }
                else {
                    return res.status(400).send("something went wrong");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside get profile");
                const email = req.body.email;
                const result = yield user_service_1.User.getProfileService(email);
                if (result) {
                    return res.status(200).send(result);
                }
                else {
                    return res.status(400).send("something went wrong");
                }
            }
            catch (error) {
                console.error("error", error);
                throw error;
            }
        });
    }
}
exports.UserControllers = new UserController();
