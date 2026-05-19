import express from 'express';

const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home");
});

viewRouter.get("/error", (req, res) => {
  res.render("error");
});

viewRouter.get("/forbidden", (req, res) => {
  res.render("forbidden");
});

export default viewRouter;