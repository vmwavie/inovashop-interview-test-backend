import { encryptSync } from "../util/encrypt";
import User from "../models/User";
import { Op } from "sequelize";
import { USER_ERRORS } from "../messages/user";

async function createUser(payload: Partial<User>) {
  payload.password = encryptSync(payload.password as string);
  const user = await User.create(payload);
  return user;
}

async function getUserById(id: number) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new Error(USER_ERRORS.USER_NOT_FOUND);
  }

  return user;
}

async function userExists(
  options: { email: string | null | null } = {
    email: null,
  }
) {
  if (!options.email) {
    throw new Error(USER_ERRORS.NULL_FIELD_EMAIL);
  }

  const where: { [Op.or]: Array<Record<string, string>> } = {
    [Op.or]: [],
  };

  if (options.email) {
    where[Op.or].push({ email: options.email });
  }

  const users = await User.findAll({ where: where });

  return users.length > 0;
}

async function validatePassword(email: string, password: string) {
  if (!email && !password) {
    throw new Error(USER_ERRORS.NULL_FIELD_EMAIL_OR_PASSWORD);
  }

  const where: { [Op.or]: Array<Record<string, string>> } = {
    [Op.or]: [],
  };

  if (email) {
    where[Op.or].push({ email: email });
  }

  const user = await User.findOne({ where });

  return User.validPassword(password, user.password);
}

async function findOneUser(options: { email?: string; id?: number }) {
  if (!options.email && !options.id) {
    throw new Error(USER_ERRORS.NULL_FIELD_EMAIL_OR_ID);
  }
  const where: { [Op.or]: Array<Record<string, string | number>> } = {
    [Op.or]: [],
  };

  if (options.email) {
    where[Op.or].push({ email: options.email });
  }
  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const user = await User.findOne({
    where,
    attributes: { exclude: ["password"] },
  });
  return user;
}

function updateUserById(user: Partial<User>, userId: number) {
  if (!user && !userId) {
    throw new Error(USER_ERRORS.NULL_FIELD_DATA_OR_ID);
  }

  if (userId && isNaN(userId)) {
    throw new Error(USER_ERRORS.INVALID_ID);
  }

  if (user.id || userId) {
    const id = user.id || userId;

    if (user.password) {
      user.password = encryptSync(user.password);
    }

    return User.update(user, {
      where: { id: id },
    });
  }
}

function deleteUserById(userId: number) {
  if (!userId) {
    throw new Error(USER_ERRORS.NULL_FIELD_ID);
  }

  if (userId && isNaN(userId)) {
    throw new Error(USER_ERRORS.INVALID_ID);
  }

  return User.destroy({
    where: { id: userId },
  });
}

export {
  createUser,
  getUserById,
  userExists,
  validatePassword,
  findOneUser,
  updateUserById,
  deleteUserById,
};
