import mongoose from 'mongoose';
import { CommentBodyI } from '../controller/types';
import blogModel from '../database/blog.schema';
import { DatabaseException } from '../exceptions';
import commentModel from '../database/comment.schema';
import fitnessLogger from '../libs/logger';

class CommentService {
  async commentBlog(commentBody: CommentBodyI, blogId: string, userId: string) {
    const existsBlogDocument = await blogModel.findOne({
      _id: blogId,
    });

    if (!existsBlogDocument || typeof existsBlogDocument == null) {
      throw new DatabaseException(403, 'Blog Document is Empty');
    }

    console.log('This is the user id', userId);

    const existsUser = await mongoose.connection
      .collection('users')
      .findOne({ _id: new mongoose.Types.ObjectId(userId) });

    console.log('This is the user exists', existsUser);
    if (!existsUser) {
      throw new DatabaseException(403, `User does not exists in the Mongo`);
    }

    const paylaod = {
      commentBody,
      blogId,
      userId,
    };

    const insertComment = async (commentPayload: {
      commentBody: CommentBodyI;
      blogId: string;
      userId: string;
    }) => {
      try {
        const commentResult = await commentModel.create({
          comment: commentBody.comment,
          user: userId,
          blog: blogId,
        });
        return commentResult;
      } catch (err) {
        throw new DatabaseException(403, err);
      }
    };
    const commentResult = await insertComment(paylaod);

    fitnessLogger.info(`Saving Comment in the Blog`);
    existsBlogDocument.comments.push(commentResult._id);
    await existsBlogDocument.save();

    return commentResult;
  }

  async getCommentBlog(blogId: string) {
    const blogs = await commentModel
      .findOne({
        blog: blogId,
      })
      .populate('blog');

    if (!blogs) {
      throw new DatabaseException(403, 'Comment Blog Does not Exists');
    }
    return blogs;
  }

  async deleteCommnet(commentId: string, userId: string) {
    const user = await mongoose.connection.collection('users').findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      throw new DatabaseException(
        403,
        `User Does not Exist with the Following Id : ${userId}`
      );
    }

    const existsComment = await commentModel.findOne({
      _id: commentId,
    });

    const proxyCommentDocument = JSON.parse(JSON.stringify(existsComment));

    if (
      !proxyCommentDocument.hasOwnProperty('blog') ||
      !proxyCommentDocument.hasOwnProperty('user')
    ) {
      throw new DatabaseException(
        403,
        'Comment Does not associated with any Blogs'
      );
    }

    const blogId = proxyCommentDocument.blog;

    const deletedResult = await commentModel.deleteOne({
      _id: commentId,
    });

    const existsBlogDo = await blogModel.findOne({
      _id: new mongoose.Types.ObjectId(blogId),
    });

    const isCommentInBlog = existsBlogDo.comments.includes(commentId as any);

    if (isCommentInBlog) {
      const newComment = existsBlogDo.comments.filter(
        (comment: any) => comment._id !== commentId
      );
      existsBlogDo.comments.push(...newComment);

      await existsBlogDo.save();

      return deletedResult.deletedCount > 0
        ? 'Deleted Successfully'
        : 'Deleted Operation Failed';
    }
    return 'Not Deleted';
  }
}

export default new CommentService();
