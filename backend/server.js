import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
// app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));


const start = async () => {


  const connectDB = await mongoose.connect("mongodb+srv://FUGU:FUGU_123@fugu.clmif80.mongodb.net/?appName=FUGU");

  app.listen(9080, () => {
    console.log("server is running on port 9080");
  })
} 
start();

