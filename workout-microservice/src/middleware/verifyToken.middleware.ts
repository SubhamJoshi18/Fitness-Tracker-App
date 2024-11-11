import type, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fitnessLogger from '../libs/logger';
import { getEnvValue } from '../utils/getKey';
import { resolve } from 'path';

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers['authorization'] ?? req.headers.authorization;

  if (!authToken) {
    fitnessLogger.error(`Auth token is missing or it is not valid`);
    process.exit(1);
  }

  const secretKey = getEnvValue('SECRET');

  return new Promise((resolve, reject) => {
    jwt.verify(authToken as string, secretKey, (err, payload) => {
      if (err) {
        fitnessLogger.error('Error validaiting the access token');
        throw err;
      } else {
        req.user = JSON.parse(JSON.stringify(payload));
        fitnessLogger.info(`Token is valid, Shifting to next Middleware`);
        next();
      }
    });
  });
};
