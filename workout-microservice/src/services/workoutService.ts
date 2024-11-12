import { queueConfig, recommendModelConfig } from '../constants/queueConstant';
import { WorkoutBodyI } from '../controller/types';
import { DatabaseException, ValidationException } from '../exceptions';
import Producer from '../queues/RabbitmqProducer';
import { checkValidDate } from '../utils/validDate';
import WorkoutRepo from '../repository/workout.repo';
import workOutModel from '../database/workout.schema';

abstract class WorkoutServiceAbs {
  abstract createWorkout(
    userDetails: any,
    data: Required<WorkoutBodyI>
  ): Promise<any>;

  abstract getWorkoutDetails(userId: any): Promise<any>;
}

class WorkoutService extends WorkoutServiceAbs {
  async createWorkout(
    userDetails: any,
    data: Required<WorkoutBodyI>
  ): Promise<any> {
    const payloadDataForSave: WorkoutBodyI = JSON.parse(JSON.stringify(data));

    const isValidDate = checkValidDate(payloadDataForSave.PreferredWorkoutTime);

    if (!isValidDate) {
      throw new DatabaseException(
        403,
        `Date you provided is invalid or does not exists`
      );
    }

    const authProducer = new Producer(
      queueConfig['queueName'],
      queueConfig['queueExchange'],
      queueConfig['queueRk']
    );

    const payload = {
      user_id: userDetails['_doc']['_id'],
      ...payloadDataForSave,
    };

    const payloadForDb = {
      ...payload,
    };

    const saveResult = await WorkoutRepo.saveDb(
      JSON.parse(JSON.stringify(payloadForDb))
    );
    await authProducer.sendToQueue(payload as any);
    return saveResult;
  }

  async getWorkoutDetails(userId: any) {
    const existsUser = await workOutModel.findOne({
      user: userId,
    });

    if (!existsUser) {
      throw new DatabaseException(
        403,
        `User cannot be found with its Workout Details`
      );
    }
    return existsUser;
  }

  async updateWorkoutDetails(validData: {
    workoutId: string | undefined;
    userPayload: any;
    modifiedWorkoutDetails: Partial<WorkoutBodyI>;
  }) {
    const userId = validData.userPayload['_doc']['_id'];

    const validUser = await workOutModel.findOne({
      $and: [
        {
          _id: validData?.workoutId,
        },
        {
          user: userId,
        },
      ],
    });

    if (!validUser) {
      throw new DatabaseException(
        403,
        'User is not valid , cannot fetch its workout details'
      );
    }

    if (Object.keys(validData?.modifiedWorkoutDetails).length === 0) {
      throw new ValidationException(403, 'All the Update Data are empty');
    }

    const updatedResult = await workOutModel.updateOne(
      {
        $and: [
          {
            _id: validData?.workoutId,
          },
          {
            user: userId,
          },
        ],
      },

      {
        ...validData?.modifiedWorkoutDetails,
      },

      {
        $new: true,
      }
    );

    return updatedResult.modifiedCount > 0 ? true : false;
  }

  async recommendBestWorkoutDetails(userPayload: any) {
    const recommedModelQueue = new Producer(
      recommendModelConfig['queueName'],
      recommendModelConfig['queue_exchange'],
      recommendModelConfig['queue_rk']
    );
    const modelPayload = JSON.parse(JSON.stringify(userPayload));

    await recommedModelQueue.sendToQueue(modelPayload);

    
  }
}

export default new WorkoutService();
