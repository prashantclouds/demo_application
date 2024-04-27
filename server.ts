import express from "express"
import { mongoConnection } from "./src/database/mongoconnection";
import userRoute from "./src/routes/user.routes"
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
      app.listen(3000,()=>{
        console.log("server started");
      })
  } catch (error) {
    throw error;
  }
}
app.use("/signup",userRoute)

startServer();
