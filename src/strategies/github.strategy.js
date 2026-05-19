import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";
import userModel from "../models/users.model.js";
dotenv.config();

const opts = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://localhost:${process.env.PORT}/api/v1/auth/githubcallback`,
};

export const githubStrategy = new GitHubStrategy(
  opts,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({ email: profile._json.email });
      if (!user) {
        // Si el usuario no existe, lo creamos
        let newUser = {
          firstname: profile._json.name || "",
          email: profile._json.email,
          loggedBy: "github",
        };
        console.log(newUser);
        const createdUser = await userModel.create(newUser);
        return done(null, createdUser);
      } else {
        // Si el usuario ya existe, lo retornamos
        return done(null, user);
      }
    } catch (error) {
      return done("Error logeando con GitHub: ", error);
    }
  },
);
