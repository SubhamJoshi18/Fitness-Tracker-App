import type, { Request, Response, NextFunction } from 'express';
import { CommentBodyI } from './types';
import { DatabaseException } from '../exceptions';
import CommentService from '../services/comment.service';
import { successResponse } from '../utils/successResponse';

class CommentController {
  private async extractUserId(userPayload: any) {
    let validBlog = [];
    const proxyDocument = JSON.parse(JSON.stringify(userPayload));
    if (proxyDocument.hasOwnProperty('_doc')) {
      validBlog.push(proxyDocument['_doc']['_id']);
    }
    return validBlog[0];
  }

  commentBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentBody: Required<CommentBodyI> = req.body;

      const userPayload = req.user ?? null;

      const userId = await this.extractUserId(userPayload);

      const blogId = req.params.blogId ?? null;

      if (!blogId) {
        throw new DatabaseException(403, 'Error in Commenting to the Blog');
      }

      const response = await CommentService.commentBlog(
        commentBody,
        blogId,
        userId
      );
      successResponse(res, 'User Comment on the Blogs', 201, response);
    } catch (err) {
      next(err);
    }
  };

  getCommentBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId ?? null;
      if (!blogId) {
        throw new DatabaseException(
          403,
          'Blog id is not present in the params'
        );
      }
      const response = await CommentService.getCommentBlog(blogId as string);
      successResponse(res, 'Blog Comment Details', 201, response);
    } catch (err) {
      next(err);
    }
  };
}

export default new CommentController();
