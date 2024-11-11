import WorkoutService from '../services/workoutService';
import type, { Request, Response, NextFunction } from 'express';
import { WorkoutBodyI } from './types';
import { successResponse } from '../utils/sucessResponse';
import { DatabaseException } from '../exceptions';

class WorkoutController {
  async createWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      const userPayload = req.user ?? null;

      if (!userPayload) {
        throw new DatabaseException(403, `User is not available right now`);
      }
      const validWorkoutBody: Required<WorkoutBodyI> = req.body;

      const response = await WorkoutService.createWorkout(
        userPayload as any,
        validWorkoutBody as Required<WorkoutBodyI>
      );

      successResponse(
        res,
        `${req.user?.firstname} Has Created its Workout Info`,
        201,
        response
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new WorkoutController();
