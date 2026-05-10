import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.get("/", (req, res) => {
    res.render('home');
})


app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})