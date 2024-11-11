import { Router } from 'express';
import WorkoutController from '../controller/workoutController';
import { verifyAuthToken } from '../middleware/verifyToken.middleware';

const workoutRouter = Router();

workoutRouter.post(
  '/workout',
  verifyAuthToken as any,
  WorkoutController.createWorkout
);

export default workoutRouter;
