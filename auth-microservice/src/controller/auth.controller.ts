import type, { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from '../validation/auth.schema';
import AuthService from '../services/auth.service';
import { LoginBodyI, RegisterBodyI } from '../services/types';
import { successResponse } from '../utils/successResponse';

class AuthController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = registerSchema.safeParse(req.body);

      if (result.error && result.error.errors) {
        res.status(403).json({
          error_details: result.error.errors,
        });
      }
      const { ...validateDatas } = result.data;

      const response = await AuthService.registerService(
        validateDatas as RegisterBodyI
      );

      successResponse(
        res,
        `${validateDatas.username} SuccessFully Registerd`,
        201,
        response
      );
    } catch (err) {
      next(err);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = loginSchema.safeParse(req.body);

      if (result.error && result.error.errors) {
        res.status(403).json({
          isError: true,
          error_details: result.error.errors,
        });
      }
      const { ...validLoginData } = result.data;

      const response = await AuthService.loginService(
        validLoginData as LoginBodyI
      );

      successResponse(
        res,
        `${validLoginData.username} Login Successfully`,
        201,
        response
      );
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
