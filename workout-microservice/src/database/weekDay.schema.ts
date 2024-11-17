import mongoose from 'mongoose';
import { WeekDayEnum } from './types';

const weekSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: WeekDayEnum,
    required: true,
  },

  dayMonth: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  nutrients: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Nutrient',
      required: false,
    },
  ],
});

const weekSchemaModel = mongoose.model('WeekDay', weekSchema);
export default weekSchemaModel;
