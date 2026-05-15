import passport from "passport";
import passportLocal from "passport-local";
import jwtPassport from "passport-jwt";
import userModel from "../models/users.model.js";
import { createUser } from "../controllers/users.controller.js";
import { createHash, validateHash } from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

const localStrategy = passportLocal.Strategy;
const JWTStrategy = jwtPassport.Strategy;
const ExtractJWT = jwtPassport.ExtractJwt;

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
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if(req && req.cookies){
    token = req.cookies['jwtCookieToken'];
  }
  return token;
};

export default initializePassport;
