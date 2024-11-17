import type, { Request, Response, NextFunction } from 'express';
import { DatabaseException } from '../exceptions';
import ReviewService from '../services/review.service';
import { ReviewBodyI } from './types';
import { successResponse } from '../utils/successResponse';

class ReviewController {
  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId ?? null;

      const reviewBody: Required<ReviewBodyI> = req.body;

      if (!blogId) {
        throw new DatabaseException(403, 'Error in creating Review');
      }

      const response = await ReviewService.createReview(
        blogId as string,
        reviewBody as Required<ReviewBodyI>
      );

      successResponse(res, 'Review Created For Blogs', 201, response);
    } catch (err) {
      next(err);
    }
  };
}

export default new ReviewController();
