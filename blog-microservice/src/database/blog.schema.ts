import mongoose from 'mongoose';
import { workoutTypeEnum } from '../controller/types';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },

    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },

    workoutType: {
      type: String,
      enum: workoutTypeEnum,
      required: [true, 'Post must have a workout type'],

      upVote: {
        type: Number,
        default: 0,
        required: false,
      },

      downVote: {
        type: Number,
        default: 0,
        required: false,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },

      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
          required: false,
        },
      ],

      review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model('Blog', blogSchema);
export default blogModel;
