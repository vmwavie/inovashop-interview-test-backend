import { Router } from "express";
import { validateRequest } from "../middleware";
import { requireUser } from "../middleware";
import {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "../validation/tasks";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByUserId,
  searchTasks,
  updateTask,
} from "../controllers/tasks";

const taskRouter = Router();

taskRouter.get("/:id", requireUser, getTaskById);
taskRouter.delete(
  "/",
  requireUser,
  validateRequest(deleteTaskSchema),
  deleteTask
);
taskRouter.post("/search", requireUser, searchTasks);
taskRouter.put("/", requireUser, validateRequest(updateTaskSchema), updateTask);
taskRouter.get("/", requireUser, getTasksByUserId);
taskRouter.post(
  "/",
  requireUser,
  validateRequest(createTaskSchema),
  createTask
);

export default taskRouter;
