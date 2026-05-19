import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import authorization from "../middleware/role.middleware.js";
dotenv.config();

const viewRouter = express.Router();

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
    failureRedirect: "/error",
  }),
  (req, res) => {
    const userInfo = req.user;
    res.render("profile", userInfo);
  },
);

viewRouter.get("/admin", authorization('admin'), (req, res) => {res.render("admin")});

export default viewRouter;
