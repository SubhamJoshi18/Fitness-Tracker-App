import mongoose from 'mongoose';
import { CreateBlogI, UpdateBlogI } from '../controller/types';
import blogModel from '../database/blog.schema';
import { DatabaseException, ValidationException } from '../exceptions';
import { BlogStatus } from '../database/types';
import { stat } from 'fs';

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

    console.log('This is the user id', userId);

    const newBlog = await blogModel.create({
      user: userId,
      title: data.title,
      description: data.description,
      workoutType: data.workoutType,
    });
    return newBlog;
  }

  async getUserBlog(userId: mongoose.Types.ObjectId): Promise<any> {
    const userBlogs = await blogModel.find({
      user: userId,
    });

    const isValidBlogs = Array.isArray(userBlogs) && userBlogs.length > 0;

    if (!isValidBlogs) {
      throw new DatabaseException(404, 'No Blog Found For User');
    }

    const query = {
      user: userId,
    };
    const countUserBlgos = await blogModel.countDocuments(query);
    if (countUserBlgos.toString().startsWith('0')) {
      throw new ValidationException(404, 'No Blog Found For User');
    }

    return userBlogs;
  }

  async getAllBlogs(): Promise<any> {
    const response = await blogModel.find({});
    if (!response) {
      throw new DatabaseException(404, 'No Blog Found');
    }
    return response;
  }

  async updateBlogs(data: UpdateBlogI, blogId: string): Promise<any> {
    const isBlog = await blogModel.findOne({
      _id: blogId,
    });

    if (!blogId) {
      throw new DatabaseException(403, `Blog Does not Exists`);
    }

    const extractUserId = (data: any) => {
      return data['user'];
    };

    const updateBlogBody: UpdateBlogI = JSON.parse(JSON.stringify(data));

    const userId = extractUserId(isBlog);

    const fetchUser = await mongoose.connection.collection('users').findOne({
      _id: userId,
    });

    const toBeResovled = await blogModel.updateOne(
      {
        _id: blogId,
      },
      {
        title: updateBlogBody?.title,
        description: updateBlogBody?.description,
      },
      {
        $new: true,
      }
    );

    const result = `${fetchUser.username} Has Updated the Post with ID : ${isBlog._id}`;
    return result;
  }

  async deleteBlogs(blogId: string): Promise<any> {
    let isBlogValid = false;

    const blogDocuments = await blogModel.findOne({
      _id: blogId,
    });

    if (Object.entries(blogDocuments).length > 0) {
      isBlogValid = true;
    }

    if (!isBlogValid) {
      throw new DatabaseException(
        403,
        'Error Blog is Empty or Document is Empty'
      );
    }

    const deleteDocument = await blogModel.deleteOne({
      _id: blogId,
    });

    return deleteDocument.deletedCount > 0 ? 'Deleted' : 'Not Deleted';
  }

  async upvoteBlogs(blogId: string): Promise<any> {
    const blogDocument: any = await blogModel.findOne({
      _id: blogId,
    });

    const proxyDocument = JSON.parse(JSON.stringify(blogDocument));

    if (Object.entries(blogDocument).length === 0) {
      throw new DatabaseException(403, 'Blog Document is Empty');
    }

    const result = proxyDocument.hasOwnProperty('upVote');

    const userDetails: any = await this.getUserDetails(blogDocument);

    if (result) {
      const modifiedLike = blogDocument.upVote + 1;

      const result = await blogModel.updateOne(
        {
          _id: blogId,
        },
        {
          upVote: modifiedLike,
        }
      );

      return result.modifiedCount > 0
        ? `${userDetails.username} has liked Post Id :  ${blogDocument['_id']}`
        : null;
    }
    return null;
  }

  async downVote(blogId: any) {
    const blogDocument: any = await blogModel.findOne({
      _id: blogId,
    });

    const proxyDocument = JSON.parse(JSON.stringify(blogDocument));

    if (Object.entries(blogDocument).length === 0) {
      throw new DatabaseException(403, 'Blog Document is Empty');
    }

    const result = proxyDocument.hasOwnProperty('downVote');

    const userDetails: any = await this.getUserDetails(blogDocument);

    if (result) {
      const modifiedLike = blogDocument.downVote + 1;

      const result = await blogModel.updateOne(
        {
          _id: blogId,
        },
        {
          downVote: modifiedLike,
        }
      );

      return result.modifiedCount > 0
        ? `${userDetails.username} has liked Post Id :  ${blogDocument['_id']}`
        : null;
    }
    return null;
  }

  async makePrivate(
    statusQuery: BlogStatus | any,
    blogId: string,
    userId: string
  ) {
    if (!(statusQuery === BlogStatus.PRIVATE)) {
      throw new ValidationException(
        403,
        `You are not trying to make it as a Private`
      );
    }

    const blogDocument = await blogModel.findOne({
      _id: blogId,
    });

    if (!blogId) {
      throw new DatabaseException(403, 'Blog Document Does not Exists');
    }
    //check if it is already private
    const isAlreadyPrivate = blogDocument.blogStatus === BlogStatus.PRIVATE;
    if (isAlreadyPrivate) {
      throw new DatabaseException(403, 'The Blog is Already Private');
    }

    const updatedData = async (status: string) => {
      return await blogModel.updateOne(
        {
          _id: blogId,
        },
        {
          blogStatus: BlogStatus.PRIVATE,
        }
      );
    };
    const updatedResult = await updatedData(statusQuery);
    return updatedResult;
  }

  private async getUserDetails(blogDocument: any) {
    const userId = blogDocument.user;
    const userPayload = await mongoose.connection.collection('users').findOne({
      _id: userId,
    });
    return userPayload;
  }
}

export default new BlogService();
