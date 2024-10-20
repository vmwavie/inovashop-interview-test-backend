import { TASK_ERRORS } from "../messages/task";
import Tasks from "../models/Tasks";
import { Op, WhereOptions } from "sequelize";
import { emitToUserDevices } from "./webSocket";

interface SearchParams {
  title?: string;
  completed?: boolean;
  description?: string;
  sortBy?: string;
  page: number;
  perPage: number;
}

interface SearchResult {
  tasks: Tasks[];
  totalCount: number;
  totalPages: number;
}

async function createTask(data: Partial<Tasks>): Promise<Tasks> {
  const task = await Tasks.create(data);
  emitToUserDevices(task.userId, "taskCreated", task);
  return task;
}

async function getTaskById(id: number): Promise<Tasks | null> {
  const task = await Tasks.findByPk(id);

  return task;
}

async function getTasksByUserId(userId: number): Promise<Tasks[]> {
  const tasks = await Tasks.findAll({ where: { userId } });

  return tasks;
}

async function updateTask(
  id: number,
  data: Partial<Tasks>,
  userId: number
): Promise<Tasks | null> {
  const task = await Tasks.findByPk(id);

  if (!task) {
    throw new Error(TASK_ERRORS.TASK_NOT_FOUND);
  }

  const hasChanges = Object.keys(data).some(key => {
    return task[key as keyof Tasks] !== data[key as keyof Partial<Tasks>];
  });

  if (!hasChanges) {
    throw new Error(TASK_ERRORS.NO_CHANGES_DETECTED);
  }

  const updatedTask = await task.update(data);
  emitToUserDevices(userId, "taskUpdated", updatedTask);
  return updatedTask;
}

async function deleteTask(taskId: number, userId: number): Promise<boolean> {
  const task = await Tasks.findOne({
    where: {
      id: taskId,
      userId: userId,
    },
  });

  if (!task) {
    throw new Error(TASK_ERRORS.TASK_NOT_FOUND_OR_UNAUTHORIZED);
  }

  await task.destroy();
  emitToUserDevices(userId, "taskDeleted", taskId);
  return true;
}

async function searchTasks(
  userId: number,
  params: SearchParams
): Promise<SearchResult> {
  const { title, completed, description, sortBy, page, perPage } = params;

  const where: WhereOptions<Tasks> = { userId };
  let order: [string, string][] = [];

  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  if (completed !== undefined) {
    where.completed = completed;
  }

  if (description) {
    where.description = { [Op.like]: `%${description}%` };
  }

  switch (sortBy) {
    case "title_asc":
      order = [["title", "ASC"]];
      break;
    case "title_desc":
      order = [["title", "DESC"]];
      break;
    case "createdAt_asc":
      order = [["created_at", "ASC"]];
      break;
    case "createdAt_desc":
      order = [["created_at", "DESC"]];
      break;
  }

  const offset = (page - 1) * perPage;

  const { count, rows } = await Tasks.findAndCountAll({
    where,
    order,
    limit: perPage,
    offset: offset,
  });

  const totalPages = Math.ceil(count / perPage);

  return {
    tasks: rows,
    totalCount: count,
    totalPages: totalPages,
  };
}

export {
  createTask,
  getTaskById,
  getTasksByUserId,
  updateTask,
  deleteTask,
  searchTasks,
};
