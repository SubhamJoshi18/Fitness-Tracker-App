import mongoose from 'mongoose';
import { ReviewBodyI } from '../controller/types';
import blogModel from '../database/blog.schema';
import { DatabaseException } from '../exceptions';
import reviewModel from '../database/review.schema';
import fitnessLogger from '../libs/logger';

class ReviewService {
  private deepCopyObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  async createReview(blogId: string, reviewBody: Required<ReviewBodyI>) {
    const blogs = await blogModel.findOne({
      _id: new mongoose.Types.ObjectId(blogId),
    });

    if (!blogs) {
      throw new DatabaseException(403, 'Blog Document is empty or invalid');
    }

    const isNumberBody = typeof reviewBody.rating === 'number';

    if (!isNumberBody) {
      throw new DatabaseException(403, 'Rating Number is Invalid');
    }

    const proxyObject = this.deepCopyObject(blogs);

    const newReview = await reviewModel.create({
      rating: reviewBody.rating,
    });

    if (!proxyObject['review'] || !proxyObject.hasOwnProperty('review')) {
      blogs.review = new mongoose.Types.ObjectId(newReview._id) as any;
      await blogs.save();
      return {
        blogs_review: blogs.review ?? 0,
      };
    } else {
      fitnessLogger.info('Review is already set , Please Update it');
      return {
        blogs_rewview: blogs.review,
      };
    }
  }
}

export default new ReviewService();
