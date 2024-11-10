import type, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import authRouter from './auth.route';
import { globalErrorMiddleware } from '../middleware/global.middleware';

export const ServerRouter = (expressApplication: Application) => {
  expressApplication.use('/api', [authRouter]);
  expressApplication.use(
    '*',
    (req: Request, res: Response, next: NextFunction): void => {
      res.status(404).json({
        message: `${req.originalUrl} Does not Exist, Please Try a valid Routes`,
      });
    }
  );
  expressApplication.use(globalErrorMiddleware as any);
};

export default ServerRouter;
