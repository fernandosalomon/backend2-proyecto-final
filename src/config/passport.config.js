import passport from "passport";
import { localLogin } from "../strategies/local.strategy.js";
import { jwtStrategy } from "../strategies/jwt.strategy.js";
import { githubStrategy } from "../strategies/github.strategy.js";
import userModel from "../models/users.model.js";

const initializePassport = () => {
  passport.use("login", localLogin);

  passport.use("jwt", jwtStrategy);

  passport.use("github", githubStrategy);

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done("Error al deserializar al usuario: " + error);
    }
  });
};

export default initializePassport;
