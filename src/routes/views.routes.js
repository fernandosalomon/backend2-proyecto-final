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

export default viewRouter;