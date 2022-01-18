import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestError } from '../error/request-error';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(errors.array());
  }

  next();
};
