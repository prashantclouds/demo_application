import express from "express"
import { mongoConnection } from "./src/database/mongoconnection";
async function startServer() {
  try {
    const app=express();
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
startServer();
