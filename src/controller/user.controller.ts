import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import { User } from "../service/user.service";

class UserController{
    async signup(req:Request,res:Response){
        try{
            const payload:IUser=req.body;
            const result:any=await User.Signup(payload);
            if(result){
                return res.status(200).send("User creted successfully");
            }
            else{
                return res.status(400).send("something went wrong")
            }
        }
        catch(error){
            throw error;
        }
    }

    async login(req:Request,res:Response){
        try{
            const payload=req.body;
            const result:any = await User.loginService(payload);
            if(result){
                return res.status(200).send(result);
            }
            else{
                return res.status(400).send("something went wrong")
            }
        }
        catch(error){
            throw error;
        }
    }

    async forgotPassword(req:Request,res:Response,next:NextFunction){
        try{
            const email = req.body.email;
            const result:any=await User.forgotPssswordService(email);
            if(result){
                return res.status(200).send("email send successfully");
            }
            else{
                return res.status(400).send("something went wrong")
            }
        }
        catch(error){
            throw error;
        }

    }
}
export const UserControllers = new UserController();