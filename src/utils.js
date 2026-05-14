import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hash(password, 10);

export const validateHash = (password, hash) =>
  bcrypt.compareSync(password, hash);
