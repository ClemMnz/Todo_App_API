import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = [];
  errors.array().map((err) => error.push(err.msg));
  console.log("errors = " + error);
  return res.status(422).json({
    message: error.join("   "),
  });
};
