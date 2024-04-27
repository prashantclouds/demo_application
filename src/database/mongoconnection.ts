import mongoose from "mongoose";

class DaoConnection{
    async connectionwithMongodb(){
        try{
            await mongoose.connect("mongodb+srv://vikashagrahari:j2E4QWs74OIlxk8h@cluster0.w5jfqek.mongodb.net/Demo-Application")
            console.log("mongo connnection successfully created");
        }
        catch(error){
            console.error("errorr in mongoconnection",error)
        }
    }
}
export const mongoConnection = new DaoConnection();