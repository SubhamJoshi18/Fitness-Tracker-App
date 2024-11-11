import mongoose from 'mongoose';
import { missingLogs } from '../../utils/missingLogs';
import { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, missingLogs('FirstName')],
  },
  lastname: {
    type: String,
    required: [true, missingLogs('LastName')],
  },
  age: {
    type: Number,
    required: [true, missingLogs('Age')],
  },
  username: {
    type: String,
    required: [true, missingLogs('Username')],
  },
  email: {
    type: String,
    required: [true, missingLogs('Email')],
  },
  password: {
    type: String,
    required: [true, missingLogs('Password')],
  },

  workoutDetails: {
    type: Schema.Types.Mixed,
    required: false,
  },
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
