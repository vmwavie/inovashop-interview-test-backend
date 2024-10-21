import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/taskService";
import { TASK_ERRORS, TASK_SUCCESS } from "../messages/task";
import { customRequest } from "../types/customDefinition";
import { USER_ERRORS } from "../messages/user";
import { ApiError } from "../util/ApiError";
import { GLOBAL_ERRORS } from "../messages/global";
import logger from "../util/logger";

async function createTask(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const taskData = { ...req.body };

    if (!taskData.userId) {
      throw new ApiError(401, USER_ERRORS.USER_NOT_FOUND);
    }

    const newTask = await taskService.createTask(taskData);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

async function getTaskById(req: Request, res: Response, next: NextFunction) {
  try {
    const taskId = parseInt(req.params.id);

    const task = await taskService.getTaskById(taskId);

    if (!task) {
      throw new ApiError(404, TASK_ERRORS.TASK_NOT_FOUND);
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

async function getTasksByUserId(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.body.userId;

    if (!userId) {
      throw new ApiError(401, USER_ERRORS.UNAUTHORIZED_ACCESS);
    }

    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function updateTask(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId, userId } = req.body;

    if (!userId) {
      throw new ApiError(401, USER_ERRORS.UNAUTHORIZED_ACCESS);
    }

    const updatedTask = await taskService.updateTask(taskId, req.body, userId);

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId, userId } = req.body;

    if (!userId) {
      throw new ApiError(401, USER_ERRORS.UNAUTHORIZED_ACCESS);
    }

    await taskService.deleteTask(taskId, userId);

    res.status(204).json({
      message: TASK_SUCCESS.DELETED,
    });
  } catch (error) {
    next(error);
  }
}

async function searchTasks(req: customRequest, res: Response) {
  try {
    const { title, completed, description, sortBy, page, perPage, userId } =
      req.body;

    if (!userId) {
      throw new ApiError(401, USER_ERRORS.UNAUTHORIZED_ACCESS);
    }

    const searchParams = {
      title: title as string | undefined,
      completed:
        completed === "true" ? true : completed === "false" ? false : undefined,
      description: description as string | undefined,
      sortBy: sortBy as string | undefined,
      page: page ? parseInt(page as string) : 1,
      perPage: perPage ? parseInt(perPage as string) : 10,
    };

    const { tasks, totalCount, totalPages } = await taskService.searchTasks(
      Number(userId),
      searchParams
    );

    res.json({
      tasks,
      currentPage: searchParams.page,
      totalPages,
      totalCount,
      perPage: searchParams.perPage,
    });
  } catch (error) {
    // (to-do) se sobrar tempo, eu refaço esse tratamento de erro.
    logger.error(error);
    return res
      .status(500)
      .json({ errorMsg: GLOBAL_ERRORS.INTERNAL_SERVER, error: true });
  }
}

export {
  getTaskById,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
};
