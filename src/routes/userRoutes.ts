import { Router } from "express";
import { requireUser, validateRequest } from "../middleware/index";
import {
  generateSecret,
  getUserData,
  updateSecret,
  updateUser,
} from "../controllers/user";
import { updateSchema, updateSecretSchema } from "../validation/user";

const userRouter = Router();

userRouter.put("/", requireUser, validateRequest(updateSchema), updateUser);
userRouter.get("/generate-shared-key", requireUser, generateSecret);
userRouter.post(
  "/update-secret",
  requireUser,
  validateRequest(updateSecretSchema),
  updateSecret
);
userRouter.get("/", requireUser, getUserData);

export default userRouter;
