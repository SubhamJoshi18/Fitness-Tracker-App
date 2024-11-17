import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema(
  {
    food_name: {
      type: String,
      required: true,
      trim: true,
    },
    food_calorie: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    carbohydrates: {
      type: Number,
      required: true,
    },
    fiber: {
      type: Number,
      default: 0,
    },
    sugar: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const nutritionModel = mongoose.model('Nutrient', nutritionSchema);
export default nutritionModel;
