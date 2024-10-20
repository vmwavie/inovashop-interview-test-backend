import dotenv from "dotenv";
import path from "path";
import { Dialect } from "sequelize";

dotenv.config({ path: ".env" });

const dbConfig = {
  dialect: "sqlite" as Dialect,
  storage_path: path.join(path.join(__dirname, "..", ".."), "database.sqlite"),
};

const jwtConfig = {
  secret: process.env.SECRET,
  expiry: process.env.TOKEN_EXPIRY_HOUR,
  saltRound: 3,
};

const otpConfig = {
  window: Number(process.env.OTP_WINDOW),
  timeStep: Number(process.env.OTP_TIMESTEP),
};

export { dbConfig, jwtConfig, otpConfig };
