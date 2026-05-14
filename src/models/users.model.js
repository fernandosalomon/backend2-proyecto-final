import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      default: "",
    },
    lastname: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    loggedBy: {
      type: String,
      enum: ["local", "github", "google"],
    },
  },
  { timestamps: true },
);

userSchema.index({ email: "text" });

const userModel = mongoose.model("User", userSchema);

export default userModel;
