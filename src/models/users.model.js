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
    phone: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    street: {
      type: String,
      trim: true,
      maxLength: 40,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      maxLength: 40,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      maxLength: 40,
      default: "",
    },
    zip: {
      type: String,
      trim: true,
      maxLength: 6,
      default: "",
    },
    avatarURL: {
      type: String,
      default: ""
    }
  },
  { timestamps: true },
);

userSchema.index({ email: "text" });

const userModel = mongoose.model("User", userSchema);

export default userModel;
