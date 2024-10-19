import { customError } from "customDefinition";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import { GLOBAL_ERRORS } from "../messages/global";

function errorHandler(
  error: customError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let err = error;

  if (!(error instanceof ApiError)) {
    const statusCode = 500;
    const message = error.message || GLOBAL_ERRORS.INTERNAL_SERVER;
    err = new ApiError(statusCode, message);
  }

  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  res.status(statusCode).send({
    code: statusCode,
    message,
  });
}

export default errorHandler;
