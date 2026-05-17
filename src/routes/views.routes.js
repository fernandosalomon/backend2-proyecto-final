import express from 'express';

const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
    res.render('home');
})

viewRouter.get("/login", (req, res) => {
    res.render('login');
})

viewRouter.get("/register", (req, res) => {
  res.render("register");
});

viewRouter.get("/profile", (req, res) => {
  res.render("profile");
});

viewRouter.get("/error", (req, res) => {
  res.render("error");
});

viewRouter.get("/forbidden", (req, res) => {
  res.render("forbidden");
});


export default viewRouter;