import { CustomError } from "@ticketsz/common";
import { Request, Response, NextFunction } from "express";

export const ErrorHandling = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ errors: error.serializeError() });
  }

  return res
    .status(500)
    .send({ errors: [{ message: "something went wrong" }] });
};
