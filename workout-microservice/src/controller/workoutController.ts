import WorkoutService from '../services/workoutService';
import type, { Request, Response, NextFunction } from 'express';
import { WorkoutBodyI } from './types';
import { successResponse } from '../utils/sucessResponse';
import { DatabaseException, ValidationException } from '../exceptions';

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

  async getWorkoutDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userPayload = req.user ?? null;

      if (!userPayload) {
        throw new DatabaseException(403, 'User payload does not exists');
      }

      const user_id = userPayload['_doc']['_id'];

      const response = await WorkoutService.getWorkoutDetails(user_id);

      successResponse(
        res,
        `${userPayload['_doc']['username']} Fetches its Workout Details. Updated Status  :${response}`,
        201,
        response
      );
    } catch (err) {
      next(err);
    }
  }

  async updateWorkoutDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const workoutId = req.params.workoutId;

      const userPayload = req.user ?? null;

      const modifiedWorkoutDetails: Partial<WorkoutBodyI> = req.body;

      const paramsPayload = {
        workoutId,
        userPayload,
        modifiedWorkoutDetails,
      };

      if (!workoutId || !userPayload) {
        throw new ValidationException(
          403,
          'Error workoutId or User payload is missing'
        );
      }

      const result = await WorkoutService.updateWorkoutDetails(paramsPayload);

      successResponse(
        res,
        'Modified Workout Details Successfully',
        201,
        result
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new WorkoutController();
