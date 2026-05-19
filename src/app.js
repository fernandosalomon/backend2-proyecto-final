import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { __dirname } from "./utils.js";

import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoConnect from "./config/mongodb.config.js";
import mongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import viewRouter from "./routes/views.routes.js";
import usersRouter from "./routes/users.views.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
    }),
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", usersRouter);

mongoConnect();

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
