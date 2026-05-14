import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

const userModel = mongoose.model('User', userSchema);

export default userModel;