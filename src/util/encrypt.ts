import bcrypt from "bcrypt";
import { jwtConfig } from "../config/config";

function encryptAsync(password: string) {
  return bcrypt.hash(password, jwtConfig.saltRound);
}

function encryptSync(password: string) {
  return bcrypt.hashSync(password, jwtConfig.saltRound);
}

function compareSync(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

function compareAsync(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export { encryptAsync, encryptSync, compareSync, compareAsync };
