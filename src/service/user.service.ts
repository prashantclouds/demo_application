import { UserE } from "../entity/user.entity";
import { IUser } from "../interface/user.interface";

class UserService{
    async Signup(payload:IUser){
        const result = await UserE.createUser(payload)
        return result;
    }
}
export const User = new UserService();