import express from "express";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();

const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home");
});

viewRouter.get("/login", (req, res) => {
  res.render("login");
});

viewRouter.get("/register", (req, res) => {
  res.render("register");
});

viewRouter.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/forbidden",
  }),
  (req, res) => {
    const userInfo = req.user;
    res.render("profile", userInfo);
  },
);

viewRouter.get("/error", (req, res) => {
  res.render("error");
});

viewRouter.get("/forbidden", (req, res) => {
  res.render("forbidden");
});

export default viewRouter;
