import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import viewRouter from './routes/views.routes.js';
import mongoConnect from './config/mongodb.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use("/", viewRouter);

mongoConnect();

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})