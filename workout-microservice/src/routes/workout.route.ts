import { Router } from 'express';
import WorkoutController from '../controller/workoutController';
import { verifyAuthToken } from '../middleware/verifyToken.middleware';

const workoutRouter = Router();

workoutRouter.post(
  '/workout',
  verifyAuthToken as any,
  WorkoutController.createWorkout
);

workoutRouter.get(
  '/workout',
  verifyAuthToken as any,
  WorkoutController.getWorkoutDetails
);

workoutRouter.patch(
  '/workout/:workoutId',
  verifyAuthToken as any,
  WorkoutController.updateWorkoutDetails
);

export default workoutRouter;
