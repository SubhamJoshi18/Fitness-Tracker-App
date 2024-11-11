import { queueConfig } from '../constants/queueConstant';
import { WorkoutBodyI } from '../controller/types';
import { DatabaseException } from '../exceptions';
import Producer from '../queues/RabbitmqProducer';
import { checkValidDate } from '../utils/validDate';
import WorkoutRepo from '../repository/workout.repo';

abstract class WorkoutServiceAbs {
  abstract createWorkout(
    userDetails: any,
    data: Required<WorkoutBodyI>
  ): Promise<any>;
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

    const saveResult = await WorkoutRepo.saveDb(JSON.parse(JSON.stringify(payloadForDb)));
    await authProducer.sendToQueue(payload as any);
    return saveResult;
  }
}

export default new WorkoutService();
