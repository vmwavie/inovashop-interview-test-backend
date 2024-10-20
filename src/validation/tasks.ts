import Joi from "joi";

const createTaskSchema = Joi.object({
  title: Joi.string().required().min(1).max(50),
  description: Joi.string().min(1).required().max(300).required(),
  completed: Joi.boolean().default(false),
  userId: Joi.number().required(),
});

const updateTaskSchema = Joi.object({
  taskId: Joi.number().required(),
  userId: Joi.number().required(),
  title: Joi.string().min(1).max(50).required(),
  completed: Joi.boolean().default(false),
  description: Joi.string().min(1).max(300).required(),
});

const deleteTaskSchema = Joi.object({
  taskId: Joi.number().required(),
  userId: Joi.number().required(),
});

export { createTaskSchema, updateTaskSchema, deleteTaskSchema };
