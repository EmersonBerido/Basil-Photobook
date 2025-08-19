import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose is now connected");
  }
  catch (err) {
    console.error("Mongoose couldn't connect", err)
  }
}