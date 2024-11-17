import { WorkoutType, FitnessLevel } from '../enums';

export interface WorkoutBodyI {
  workoutType: WorkoutType;
  FitnessLevel: FitnessLevel;
  workoutFrequency: number;
  workoutMonth: number;
  workoutGoals?: string;
  PreferredWorkoutTime: Date;
}

export interface FoodRountineI {
  weekDay: [
    {
      food_name: string;
    }
  ];
}
