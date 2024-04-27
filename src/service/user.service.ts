import { UserE } from "../entity/user.entity";
import { IUser } from "../interface/user.interface";
import nodemailer from "nodemailer";

class UserService {
  async Signup(payload: IUser) {
    const result = await UserE.createUser(payload);
    return result;
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
