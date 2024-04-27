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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const ApplicationError_1 = require("../common/ApplicationError");
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_session_model_1 = require("../model/admin.session.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || "default";
class UserService {
    Signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashpassword = yield bcrypt_1.default.hash(payload.password, 10);
            const data = {
                email: payload.email,
                password: hashpassword,
                firstName: payload.firstName,
                lastName: payload.lastName
            };
            const result = yield user_entity_1.UserE.createUser(data);
            return result;
        });
    }
    loginService(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield user_entity_1.UserE.findOne({ email: payload.email });
            if (!userData)
                throw new ApplicationError_1.ApplicationError("BadRequestError", "invalid email user not exist");
            const isPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
            if (!isPassword)
                throw new ApplicationError_1.ApplicationError("BadRequestError", "invalid password");
            const findSession = yield admin_session_model_1.session.findOne({ email: payload.email });
            const accessToken = jsonwebtoken_1.default.sign({ aid: userData._id }, SECRET_KEY, { expiresIn: "2d" });
            if (!findSession) {
                yield admin_session_model_1.session.create({
                    email: payload.email,
                    status: admin_session_model_1.SessionStatus.Active,
                    token: accessToken
                });
                return accessToken;
            }
            else {
                yield admin_session_model_1.session.findOneAndUpdate({ email: payload.email }, { token: accessToken });
                return accessToken;
            }
        });
    }
    forgotPssswordService(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserE.findOne({ email: email });
            if (user) {
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                console.log(otp);
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "p",
                        pass: "",
                    },
                });
                const mailOptions = {
                    from: "",
                    to: user.email,
                    subject: "Verification Code",
                    text: `Your OTP is: ${otp}`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error occurred while sending email:", error);
                    }
                    else {
                        console.log("Email sent:", info.response);
                    }
                });
            }
        });
    }
    getProfileService(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.UserE.findOne({ email: email });
            return user;
        });
    }
}
exports.User = new UserService();
