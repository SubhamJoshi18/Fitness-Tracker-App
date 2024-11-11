import { WorkoutBodyI } from '../controller/types';
import workOutModel from '../database/workout.schema';
import { DatabaseException } from '../exceptions';

class WorkoutRepo {
  async saveDb(data: WorkoutBodyI & { user_id: any }) {
    try {
      const workout = await workOutModel.create({
        user: data.user_id,
        workoutMonth: data.workoutMonth,
        workoutFrequency: data.workoutFrequency,
        FitnessLevel: data.FitnessLevel,
        PreferredWorkoutTime: data.PreferredWorkoutTime,
        workoutType: data.workoutType,
        WorkoutGoals: data.workoutGoals,
      });
      return workout;
    } catch (err) {
      console.log(err);
      throw new DatabaseException(
        403,
        `Failed to save workout: ${err.message}`
      );
    }
  }
}

export default new WorkoutRepo();
