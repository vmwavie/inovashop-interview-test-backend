import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

function validateRequest(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details, message } = error;
      const messages = details.map(i => i.message).join(",");

      res.status(400).json({ error: messages, msg: message });
    }
  };
}

export default validateRequest;
