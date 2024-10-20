import { GLOBAL_ERRORS } from "../messages/global";
import { jwtConfig } from "../config/env";

import jwt from "jsonwebtoken";

function sign(
  payload: string | Buffer | object,
  options = { expiresIn: jwtConfig.expiry + "h" }
) {
  return jwt.sign(payload, jwtConfig.secret, options);
}

function verify(token: string) {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valid: true, expired: false, decoded };
  } catch (err) {
    return {
      valid: false,
      expired:
        err instanceof Error ? err.message : err === GLOBAL_ERRORS.JWT_EXPIRED,
      msg: err instanceof Error ? err.message : err,
      decoded: null as null,
    };
  }
}

export { sign, verify };
