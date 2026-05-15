import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controller.js";
import passport from "passport";
import { generateToken } from "../utils.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
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
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

usersRouter.post("/", async (req, res) => {
  const newUserData = req.body;
  if (!newUserData)
    return res.status(400).json({
      success: false,
      message: "No user data provided",
      data: null,
    });

  try {
    const response = await createUser(newUserData);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }

  const newUserData = req.body;
  if (!newUserData) {
    return res.status(400).json({
      success: false,
      message: "No user data provided",
      data: null,
    });
  }

  try {
    const response = await updateUser(userID, newUserData);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
      data: null,
    });
  }
  try {
    const response = await deleteUser(userID);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

usersRouter.post("/register", async (req, res) => {
  const user = req.body;
  user.loggedBy = "local";
  try {
    const response = await createUser(user);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

usersRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    const user = req.user;
    //4) Si pasa la validación creamos un objeto usuario.
    const userInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };
    //5) Generamos un JWT.
    const token = generateToken(userInfo);
    //6) Guardamos el JWT en una cookie.
    res.cookie("jwtCookieToken", token, { httpOnly: true });
    //7) Redirigimos al usuario a la página de perfil
    res.redirect("/profile");
  },
);

export default usersRouter;
