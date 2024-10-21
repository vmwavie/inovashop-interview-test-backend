import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string().min(8),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string().min(8),
});

const updateSecretSchema = Joi.object({
  id: Joi.number().required(),
  otp: Joi.string().min(5).max(7).required(),
  shared_key: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().min(5).max(7).required(),
  new_password: Joi.string().min(8).required(),
});

export {
  registerSchema,
  loginSchema,
  updateSchema,
  updateSecretSchema,
  resetPasswordSchema,
};
