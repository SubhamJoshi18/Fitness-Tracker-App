import type, { Request, Response, NextFunction } from 'express';
import {
  DatabaseException,
  UnAuthorizedException,
  ValidationException,
} from '../constants/errConstant';
import { UnAuthorizedException as UnAuthorizedClass } from '../exceptions/index';
import { ValidationException as ValidationClass } from '../exceptions/index';
import { DatabaseException as DatabaseClass } from '../exceptions/index';
import fitnessLogger from '../libs/logger';

export const globalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === UnAuthorizedException && err instanceof UnAuthorizedClass) {
    fitnessLogger.error(`Un Authorized Exception expected!!...`);
    return res.status(err.getStatusNumber()).json({
      err_message: err.getMessage(),
      error: true,
    });
  } else if (
    err.name === ValidationException &&
    err instanceof ValidationClass
  ) {
    fitnessLogger.error(`Validation Exception expected!!...`);
    return res.status(err.getStatusNumber()).json({
      err_message: err.getMessage(),
      error: true,
    });
  } else if (err.name === DatabaseException && err instanceof DatabaseClass) {
    fitnessLogger.error(`Database Exception expected!!...`);
    return res.status(err.getStatusNumber()).json({
      err_message: err.getMessage(),
      error: true,
    });
  }

  return res.status(500).json({
    message: err.message,
    error: true,
  });
};
