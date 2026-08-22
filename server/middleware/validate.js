import { validationResult } from "express-validator";
import { sendResponse } from "../utils/sendResponse.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return sendResponse(res, 400, false, errors.array()[0].msg, null, { errors: errors.array() });
  };
};
