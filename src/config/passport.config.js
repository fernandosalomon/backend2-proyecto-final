import passport from "passport";
import passportLocal from "passport-local";
import userModel from "../models/users.model.js";
import { createUser } from "../controllers/users.controller.js";
import { createHash, validateHash } from "../utils.js";

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstname, lastname } = req.body;

        try {
          const user = await userModel.findOne({ email: username });
          if (user) done(null, { message: "Usuario ya registrado" });

          const userData = {
            firstname,
            lastname,
            email: username,
            password: createHash(password),
            loggedBy: "local",
            role: "user",
          };

          const createdUser = await createUser(userData);
          done(null, { user: createdUser });
        } catch (error) {
          done("Error creating new user: " + error);
        }
      },
    ),
  );

  passport.use(
    "login",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) done("Invalid user credentials");

          const passwordCheck = validateHash(password, user.password);
          if (!passwordCheck) done("Invalid user creadentials");

          done(null, user);
        } catch (error) {
          done("Error creating new user: " + error);
        }
      },
    ),
  );
};

export default initializePassport;
