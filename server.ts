import express from "express"
import { mongoConnection } from "./src/database/mongoconnection";
import userRoute from "./src/routes/user.routes"
import dotenv from "dotenv"
dotenv.config()
const port =process.env.PORT
const app=express();

app.use(express.json())
async function startServer() {
  try {
    console.log("============= Before Server Start =============");
    await mongoConnection.connectionwithMongodb();
      console.log(
        `%c${"Welcome to Demo Backend App"}`,
        `${"color: #e67e22; font-size: 24px;font-weight: bold;"}`,
      );;
      app.listen(port,()=>{
        console.log("server started",port);
      })
  } catch (error) {
    throw error;
  }
}
app.use("/user",userRoute)

startServer();
