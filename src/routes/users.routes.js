import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const response = await getUserById(userID);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
});

usersRouter.post("/", async (req, res) => {
  const newUserData = req.body;
  if (!newUserData)
    return res.status(400).json({
      success: false,
      message: "No user data provided",
      data: null
    });

  try {
    const response = await createUser(newUserData);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
      data: null
    });
  }

  const newUserData = req.body;
  if (!newUserData) {
    return res.status(400).json({
      success: false,
      message: "No user data provided",
      data: null
    });
  }

  try {
    const response = await updateUser(userID, newUserData);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
      data: null
    });
  }
  try {
    const response = await deleteUser(userID);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
});

export default usersRouter;
