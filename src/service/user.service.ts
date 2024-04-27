import { ApplicationError } from "../common/ApplicationError";
import { UserE } from "../entity/user.entity";
import { IUser } from "../interface/user.interface";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { SessionStatus, session } from "../model/admin.session.model";

const SECRET_KEY = process.env.SECRET_KEY ||"default";

class UserService {
  async Signup(payload: IUser) {
   const hashpassword = await bcrypt.hash(payload.password,10)
   const data={
    email:payload.email,
    password:hashpassword,
    firstName:payload.firstName,
    lastName:payload.lastName
   }
    const result = await UserE.createUser(data);
    return result;
  }

  async loginService(payload:any){
    const userData= await UserE.findOne({email:payload.email})
    if(!userData) throw new ApplicationError("BadRequestError","invalid email user not exist")
    const isPassword = await bcrypt.compare(payload.password,userData.password)
    if(!isPassword) throw new ApplicationError("BadRequestError","invalid password");

    
    const accessToken = jwt.sign(
      { aid: payload.admin_id, session: payload.session_id },
      SECRET_KEY,
      { expiresIn: "2d" },
    );
    const findSession = await session.findOne({email:payload.email})
    if(!findSession){
    await session.create({
      email: payload.email,
      status: SessionStatus.Active,
      token:accessToken
    });
    return accessToken;
  }
  else{
    await session.findOneAndUpdate({email:payload.email},{token:accessToken})
  }
}

  async forgotPssswordService(email: string) {
    const user = await UserE.findOne({ email: email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(otp);

      const transporter = nodemailer.createTransport({
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
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  }
}
export const User = new UserService();
