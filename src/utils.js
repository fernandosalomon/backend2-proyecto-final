import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hash(password, 10);

export const validateHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

const __JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (payload) => jwt.sign(payload, __JWT_SECRET, {expiresIn: '1h'});

export const validateToken = (token) => jwt.verify(token, __JWT_SECRET);


