import userModel from "../models/users.model.js";

export const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    return { status: 200, payload: { data: users } };
  } catch (error) {
    console.log("Error retrieving information from database" + error);
    return { status: 500, payload: { message: "Internal server error" } };
  }
};

export const getUserById = async (userID) => {
  try {
    const user = await userModel.findById(userID);
    if (!user) return { status: 404, payload: { message: "User not found" } };
    return { status: 200, payload: { data: user } };
  } catch (error) {
    console.log("Error retrieving information from database" + error);
    return { status: 500, payload: { message: "Internal server error" } };
  }
};

export const createUser = async (userData) => {
  if (!userData.email || !userData.loggedBy)
    return {
      status: 404,
      payload: { message: "User object missing data" },
    };
  const {
    firstname = "",
    lastname = "",
    username = "",
    email,
    password = "",
    role = "user",
    loggedBy,
  } = userData;

  try {
    const user = await userModel.findOne({ email });
    if (user)
      return {
        status: 404,
        payload: { message: "User already registered" },
      };

    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
      role,
      loggedBy,
    };

    const createdUser = await userModel.create(newUser);
    return { status: 201, payload: { data: createdUser } };
  } catch (error) {
    console.log("Error creating new user" + error);
    return { status: 500, payload: { message: "Internal server error" } };
  }
};

export const updateUser = async (userID, userNewData) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userID, userNewData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedUser)
      return { status: 404, payload: { message: "User data not found" } };
    return { status: 200, payload: { data: updatedUser } };
  } catch (error) {
    console.log("Error updating user" + error);
    return { status: 500, payload: { message: "Internal server error" } };
  }
};

export const deleteUser = async (userID) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(userID);
    if (!deletedUser) throw new Error("User ID not found");

    return { status: 200, payload: { data: deletedUser } };
  } catch (error) {
    console.log("Error deleting user" + error);
    return { status: 500, payload: { message: "Internal server error" } };
  }
};
