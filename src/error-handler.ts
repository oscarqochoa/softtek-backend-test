import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { CreateError } from "./common/errors/create.error";
import { NotFoundError } from "./common/errors/not-found.error";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "validation failed",
      details: err?.fields,
    });
  }

  if (err instanceof CreateError) {
    return res.status(err.status).json(err.toJSON());
  }

  if (err instanceof NotFoundError) {
    return res.status(err.status).json(err.toJSON());
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }

  next();
}
