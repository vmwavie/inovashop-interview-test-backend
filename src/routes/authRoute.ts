import { Router } from "express";
import { validateRequest } from "../middleware";
import { loginUser, registerUser, resetPassword } from "../controllers/auth";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/user";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), registerUser);
authRouter.post("/login", validateRequest(loginSchema), loginUser);
authRouter.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  resetPassword
);

export default authRouter;
