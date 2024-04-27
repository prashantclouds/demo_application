import BaseEntity from "./base.entity";

class UserEntity extends BaseEntity{
    async createUser(payload:any){
        const result = await new this.modelName(payload).save()
    }
}
export const UserE = new UserEntity();