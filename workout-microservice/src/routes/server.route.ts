import type, { Application, Request, Response, NextFunction } from 'express';
import { globalErrorMiddleware } from '../middleware/global.middleware';

export const serverRoutes = (expressApplication: Application) => {
  expressApplication.use('/api', []);

  expressApplication.use(
    '*',
    (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: `${req.originalUrl} Does not exists, Please try a valid routes `,
      });
    }
  );

  expressApplication.use(globalErrorMiddleware as any);
};
