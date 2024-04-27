import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { SessionStatus, session } from "../model/admin.session.model";
import dotenv from "dotenv"
import { User } from "../model/user.schema";
import { ApplicationError } from "../common/ApplicationError";
dotenv.config()
const SECRET_KEY=process.env.SECRET_KEY||""

class AuthMiddleware {
    async verifyUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;
            console.log("token",token)
            if (!token || !token.startsWith("Bearer ")) {
                throw new Error("Unauthorized: Missing or invalid token");
            }
            const jwtToken = token.split(" ")[1];
            const userData: any = jwt.verify(jwtToken, SECRET_KEY);
            const payload = await User.findOne({_id:userData.aid})
            if(!payload){
                throw new ApplicationError("BadRequestError","you are not validate user")
            }
            const sessionData = await session.findOne({ email: payload.email, status: SessionStatus.Active });
            if (!sessionData || sessionData.token !== jwtToken) {
                throw new Error("Unauthorized: Invalid session or token");
            }
            next();
        } catch (error:any) {
            res.status(401).json({ message: error.message });
        }
    }
}

export const authenticationMiddleware = new AuthMiddleware()