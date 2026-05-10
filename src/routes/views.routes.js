import express from 'express';

const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
    res.render('home');
})

viewRouter.get("/login", (req, res) => {
    res.render('login');
})

export default viewRouter;