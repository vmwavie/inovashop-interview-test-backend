import { get } from "lodash";
import { getUserById } from "../services/userService";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { USER_ERRORS } from "../messages/user";
import { GLOBAL_ERRORS } from "../messages/global";

async function requireUser(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = get(req, "user") as { id: number; role?: number } | undefined;

    if (!user) {
      return res
        .status(403)
        .json({ errorMsg: USER_ERRORS.NULL_AUTH_TOKEN, error: true });
    }

    const data = await getUserById(user.id);
    req.user = data?.toJSON();

    return next();
  } catch (err) {
    let msg = GLOBAL_ERRORS.INTERNAL_SERVER;

    msg = err instanceof Error ? err.message : err;

    return res.status(400).json({ errorMsg: msg, error: true });
  }
}
export default requireUser;
