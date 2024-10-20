import { findOneUser, updateUserById } from "../services/userService";
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
import { generateOTPSecret, validateRequestOTP } from "../util/otp";
import { USER_ERRORS, USER_SUCCESS } from "../messages/user";
const omitData = ["password"];

async function updateUser(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.user;

    const body = req.body;

    const user = await findOneUser({ id: userId });

    if (!user) {
      throw new ApiError(400, USER_ERRORS.USER_NOT_FOUND);
    }

    const updated = await updateUserById(body, parseInt(userId, 10));

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0] ? USER_SUCCESS.UPDATED : USER_ERRORS.FAILED_TO_UPDATE,
      error: false,
    });
  } catch (err) {
    next(err);
  }
}

async function generateSecret(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const sharedKey: string = generateOTPSecret();

    return res.status(200).json({
      sharedKey: sharedKey,
    });
  } catch (err) {
    next(err);
  }
}

async function updateSecret(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    interface UpdateSecretBody {
      id: number;
      otp: string;
      shared_key: string;
    }

    let body = req.body as unknown as UpdateSecretBody;

    body = omit(body, omitData) as UpdateSecretBody;

    const { id, otp, shared_key } = body;

    if (!id || !otp) {
      throw new ApiError(400, USER_ERRORS.NULL_FIELD_ID_OR_OTP);
    }

    let secret = shared_key;

    const user = await findOneUser({ id });

    if (!user) {
      throw new ApiError(400, USER_ERRORS.USER_NOT_FOUND);
    }

    if (user.sharedkey) {
      secret = user.sharedkey;
    }

    if (!secret) {
      throw new ApiError(400, USER_ERRORS.NULL_FIELD_SECRET);
    }

    const validateOTP = validateRequestOTP(secret, otp);

    if (!validateOTP) {
      return res.status(400).send({
        error: true,
        errorMsg: USER_ERRORS.OTP_CODE_INCORRECT,
      });
    }

    await updateUserById({ sharedkey: secret }, id);

    return res.status(200).json({
      updated: true,
      msg: USER_SUCCESS.SECRET_UPDATED,
      error: false,
    });
  } catch (err) {
    next(err);
  }
}
async function getUserData(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({
      data: req.user,
      error: false,
    });
  } catch (err) {
    next(err);
  }
}

export { updateUser, generateSecret, updateSecret, getUserData };
