import express from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller.js";
import { generateToken } from "../utils.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
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

authRouter.post(
  "/login",
  passport.authenticate("login"),
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

export default authRouter;
