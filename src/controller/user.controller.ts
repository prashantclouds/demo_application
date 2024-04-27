import { Request, Response } from "express";
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
}
export const UserControllers = new UserController();