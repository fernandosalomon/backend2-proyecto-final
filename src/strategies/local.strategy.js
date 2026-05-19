import passportLocal from "passport-local";
import userModel from "../models/users.model.js";
import { validateHash } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

const LocalStrategy = passportLocal.Strategy;

export const localLogin = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
  },
  async (req, username, password, done) => {
    try {
      //1) Buscamos el usuario en la base de datos.
      const user = await userModel.findOne({ email: username });
      //2) Si el usuario no existe respondemos con un error.
      if (!user) done("Invalid user credentials");
      //3) Verificamos si la contraseña es correcta.
      const passwordCheck = validateHash(password, user.password);
      if (!passwordCheck) done("Invalid user creadentials");

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

