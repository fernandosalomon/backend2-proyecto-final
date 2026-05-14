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
    res.status(response.status).json(response.payload);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", payload: { message: "Internal Server Error" } });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const response = await getUserById(userID);
    res.status(response.status).json(response.payload);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", payload: { message: "Internal Server Error" } });
  }
});

usersRouter.post("/", async (req, res) => {
  const newUserData = req.body;
  if (!newUserData)
    return res
      .status(404)
      .json({ status: "error", payload: { message: "No user data found" } });

  try {
    const response = await createUser(newUserData);
    res.status(response.status).json(response.payload);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", payload: { message: "Internal Server Error" } });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res
      .status(404)
      .json({ status: "error", payload: { message: "No user data found" } });
  }

  const newUserData = req.body;
  if (!newUserData) {
    return res
      .status(404)
      .json({ status: "error", payload: { message: "No user data found" } });
  }

  try {
    const response = await updateUser(userID, newUserData);
    res.status(response.status).json(response.payload);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", payload: { message: "Internal Server Error" } });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res
      .status(404)
      .json({ status: "error", payload: { message: "No user data found" } });
  }
  try {
    const response = await deleteUser(userID);
    res.status(response.status).json(response.payload);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", payload: { message: "Internal Server Error" } });
  }
});

export default usersRouter;
