import {
  createUser,
  findOneUser,
  updateUserById,
  userExists,
  validatePassword,
} from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { sign } from "../util/jwt";
import { ApiError } from "../util/ApiError";
import { USER_ERRORS, USER_SUCCESS } from "../messages/user";
import { validateRequestOTP } from "../util/otp";

const omitData = ["password"];

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    let user = req.body;

    const userExist = await userExists({
      email: user.email,
    });

    if (userExist) {
      throw new ApiError(400, USER_ERRORS.EMAIL_IN_USE);
    }

    user = await createUser(user);
    const userData = omit(user?.toJSON(), omitData);
    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      error: false,
      accessToken,
      msg: USER_SUCCESS.CREATED,
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, USER_ERRORS.FIELD_DOES_NOT_MATCH);
    }

    const validPassword = await validatePassword(user.email, password);

    if (!validPassword) {
      throw new ApiError(400, USER_ERRORS.FIELD_DOES_NOT_MATCH);
    }

    const userData = omit(user?.toJSON(), omitData);
    const accessToken = sign({ ...userData });

    return res.status(200).json({
      data: userData,
      access_token: accessToken,
      error: false,
    });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, otp, new_password } = req.body;

    let user = await findOneUser({ email });

    if (!user) {
      throw new ApiError(400, USER_ERRORS.EMAIL_DONT_EXIST);
    }

    user = user?.toJSON();

    const validateOTP = validateRequestOTP(user.sharedkey, otp);

    if (!validateOTP) {
      return res.status(400).send({
        error: true,
        errorMsg: USER_ERRORS.OTP_CODE_INCORRECT,
      });
    }

    const updated = await updateUserById({ password: new_password }, user.id);

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0]
        ? USER_SUCCESS.PASSWORD_RESETED
        : USER_ERRORS.FAILED_TO_RESET,
      error: false,
    });
  } catch (err) {
    next(err);
  }
}

export { registerUser, loginUser, resetPassword };
