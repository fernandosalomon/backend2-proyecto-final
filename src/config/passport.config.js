import passport from "passport";
import passportLocal from "passport-local";
import jwtPassport from "passport-jwt";
import dotenv from "dotenv";
import userModel from "../models/users.model.js";
import { validateHash } from "../utils.js";
dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = jwtPassport.Strategy;
const ExtractJWT = jwtPassport.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
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
          return done(null, { user: jwt_payload });
        } catch (error) {
          done(error);
        }
      },
    ),
  );

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

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

export default initializePassport;
