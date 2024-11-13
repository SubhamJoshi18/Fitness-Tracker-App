import mongoose from 'mongoose';
import { ReviewRatingEnum } from '../controller/types';

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    enum: ReviewRatingEnum,
    default: 0,
  },
});

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;
