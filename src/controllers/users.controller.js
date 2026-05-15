import userModel from "../models/users.model.js";
import { createHash } from "../utils.js";

export const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    return {
      status: 200,
      success: true,
      message: "Users retrieved successfully",
      data: users,
    };
  } catch (error) {
    console.log("Error retrieving information from database" + error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export const getUserById = async (userID) => {
  try {
    const user = await userModel.findById(userID);
    if (!user)
      return {
        status: 404,
        success: false,
        message: "User not found",
        data: null,
      };
    return {
      status: 200,
      success: true,
      message: "User retrieved successfully",
      data: user,
    };
  } catch (error) {
    console.log("Error retrieving information from database" + error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export const createUser = async (userData) => {
  if (!userData.email || !userData.loggedBy)
    return {
      status: 400,
      success: false,
      message: "Required fields are missing: email and loggedBy are mandatory",
      data: null,
    };
  const {
    firstname = "",
    lastname = "",
    email,
    password = "",
    role = "user",
    loggedBy,
  } = userData;
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return {
        status: 409,
        success: false,
        message: "User already exists with this email",
        data: null,
      };
    const newUser = {
      firstname,
      lastname,
      email,
      password: createHash(userData.password),
      role,
      loggedBy,
    };
    const createdUser = await userModel.create(newUser);
    return {
      status: 201,
      success: true,
      message: "User created successfully",
      data: createdUser,
    };
  } catch (error) {
    console.log("Error creating new user" + error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export const updateUser = async (userID, userNewData) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userID, userNewData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedUser)
      return {
        status: 404,
        success: false,
        message: "User not found",
        data: null,
      };
    return {
      status: 200,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.log("Error updating user" + error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

export const deleteUser = async (userID) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(userID);
    if (!deletedUser)
      return {
        status: 404,
        success: false,
        message: "User not found",
        data: null,
      };

    return {
      status: 200,
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    };
  } catch (error) {
    console.log("Error deleting user" + error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};
