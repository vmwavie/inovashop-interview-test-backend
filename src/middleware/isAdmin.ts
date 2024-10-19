import { get } from "lodash";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { GLOBAL_ERRORS } from "../messages/global";

async function isAdmin(req: customRequest, res: Response, next: NextFunction) {
  try {
    const user = get(req, "user") as { role?: number } | undefined;

    if (user.role !== 1) {
      return res
        .status(403)
        .json({ error: true, errorMsg: GLOBAL_ERRORS.ACCESS_DENIED });
    }

    return next();
  } catch (err) {
    let msg = GLOBAL_ERRORS.INTERNAL_SERVER;

    msg = err instanceof Error ? err.message : err;

    return res.status(400).json({ errorMsg: msg, error: true });
  }
}

export default isAdmin;
