import type, { Application, Request, Response } from 'express';
import blogRouter from './blog.route';
import commentRouter from './comment.route';
import { globalErrorMiddleware } from '../middleware/global.middleware';

export const serverRouter = (expressApplication: Application) => {
  expressApplication.use('/api', [blogRouter, commentRouter]);

  expressApplication.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      message: `${req.originalUrl} Does not Exists`,
    });
  });

  expressApplication.use(globalErrorMiddleware as any);
};
