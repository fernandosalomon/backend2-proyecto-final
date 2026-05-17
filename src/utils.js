import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, 10);

export const validateHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

const __JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (payload) =>
  jwt.sign(payload, __JWT_SECRET, { expiresIn: "1h" });

export const validateToken = (token) => jwt.verify(token, __JWT_SECRET);

export const auth = (role) => {
  return async(req, res, next) => {
    if(!req.user) return res.status(401).json({
      success: false,
      message: "Unauthorized: User not found in JWT",
      data: null,
    });

    if(req.user.role != role) return res.status(403).json({
      success: false,
      message: "Forbidden: User does not have the required role",
      data: null,
    });

    next();
  }
}
