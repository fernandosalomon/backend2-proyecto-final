import express from "express";
import dotenv from "dotenv";
dotenv.config();
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
import viewRouter from "./routes/views.routes.js";
import mongoConnect from "./config/mongodb.config.js";
import usersRouter from "./routes/users.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

initializePassport();
app.use(passport.initialize());


app.use("/", viewRouter);
app.use("/api/v1/users", usersRouter);

mongoConnect();

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
