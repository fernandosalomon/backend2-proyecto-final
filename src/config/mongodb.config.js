import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const __MONGODB_URI = process.env.MONGODB_URI || null;

const mongoConnect = () => {
  try {
    if (!__MONGODB_URI) throw new Error("No database information found");

    mongoose.connect(__MONGODB_URI);
    console.log("Connected to DB");
    return "success";
  } catch (error) {
    console.log("Error connecting to DB: " + error);
    return "error";
  }
};

export default mongoConnect;
