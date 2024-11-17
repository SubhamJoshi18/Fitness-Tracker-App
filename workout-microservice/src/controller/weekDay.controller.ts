import type, { Request, Response, NextFunction } from 'express';
import { FoodRountineI } from './types';
import mongoose from 'mongoose';
import { DatabaseException } from '../exceptions';
import WeekDayService from '../services/weekDay.service';
import { successResponse } from '../utils/sucessResponse';

class WeekDayController {
  private extractUserId(userData: any) {
    const deepJsonObj = JSON.parse(JSON.stringify(userData));
    if (deepJsonObj.hasOwnProperty('_doc')) {
      return deepJsonObj['_doc']['_id'];
    }
  }

  private async getUserDetails(userId: string) {
    const userDetails = await mongoose.connection.collection('users').findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    return userDetails;
  }

  createFoodRountineForDay = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userPayload = req.user ?? null;

      const weekBody: Required<FoodRountineI> = req.body;

      if (!userPayload) {
        throw new DatabaseException(
          403,
          'User payload Does not exists in the Documents'
        );
      }

      const userId = this.extractUserId(userPayload);
      const userDetails = this.getUserDetails(userId);

      const response = await WeekDayService.weeklyFoodRoutine(
        userDetails,
        weekBody
      );

      successResponse(res, 'Weekly is Customized', 201, response);
    } catch (err) {
      next(err);
    }
  };
}

export default new WeekDayController();
