import mongoose, { Schema } from 'mongoose';

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    workoutType: {
      type: String,
      enum: ['Cardio', 'Strength', 'Flexibility', 'Balance'],
      required: true,
    },

    FitnessLevel: {
      type: String,
      enum: ['Beginner', 'Moderate', 'Expert', 'Trainer'],
    },

    workoutFrequency: {
      type: Number,
      required: true,
    },

    workoutMonth: {
      type: Number,
      required: true,
    },

    WorkoutGoals: {
      type: String,
      required: false,
    },
    PreferredWorkoutTime: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const workOutModel = mongoose.model('Workout', WorkoutSchema);
export default workOutModel;
