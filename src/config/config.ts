import dotenv from "dotenv";
import path from "path";
import { Dialect } from "sequelize";

dotenv.config({ path: ".env" });

const projectRoot = path.join(__dirname, "..", "..");

export const dbConfig = {
  dialect: "sqlite" as Dialect,
  storage: path.join(projectRoot, "database.sqlite"),
};

export const jwtConfig = {
  secret: process.env.SECRET,
  expiry: process.env.TOKEN_EXPIRY_HOUR,
  saltRound: 3,
};

export const otpConfig = {
  window: Number(process.env.OTP_WINDOW),
  timeStep: Number(process.env.OTP_TIMESTEP),
};
