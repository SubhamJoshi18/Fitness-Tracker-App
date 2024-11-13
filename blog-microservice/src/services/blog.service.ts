import mongoose from 'mongoose';
import { CreateBlogI } from '../controller/types';
import blogModel from '../database/blog.schema';
import { ValidationException } from '../exceptions';

abstract class BlogServiceAbs {
  abstract createBlog(
    validData: Required<CreateBlogI>,
    userPayload: any
  ): Promise<any>;
}

class BlogService extends BlogServiceAbs {
  private validWorkoutDetails(data: any) {
    if (Object.entries(data).length > 0) {
      return true;
    }
    return false;
  }

  async createBlog(
    data: Required<CreateBlogI>,
    userPayload: any
  ): Promise<any> {
    const userId = userPayload['_doc']['_id'];
    const validData = this.validWorkoutDetails(data);

    if (!validData) {
      throw new ValidationException(403, `Properties are Empty`);
    }

    const newBlog = new blogModel({
      user: userId,
      title: data.title,
      description: data.description,
      workoutType: data.workoutType,
    });

    const savedResult = await newBlog.save();
    return savedResult;
  }
}

export default new BlogService();
