import type, { NextFunction, Request, Response } from 'express';
import { CreateBlogI, UpdateBlogI } from './types';
import { DatabaseException, ValidationException } from '../exceptions';
import BlogService from '../services/blog.service';
import { successResponse } from '../utils/successResponse';

class BlogController {
  createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPayload = req.user ?? null;
      if (!userPayload) {
        throw new ValidationException(403, `User is not Authorized`);
      }
      const blogBody: Required<CreateBlogI> = req.body;
      console.log(blogBody);

      const proxyBlogBody = new Proxy(blogBody, {
        get(target, prop) {
          if (!(prop in target) || target[prop] == '')
            throw new ValidationException(403, `Properties are Empty`);
          return target[prop];
        },
      });

      const result = await BlogService.createBlog(
        proxyBlogBody as CreateBlogI,
        userPayload as any
      );

      successResponse(res, `User Created an Blog Successfully`, 201, result);
    } catch (err) {
      next(err);
    }
  };

  getUserBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPayload = req.user ?? null;
      if (!userPayload) {
        throw new ValidationException(403, 'User payload is missing');
      }

      const proxyObject = new Proxy(userPayload, {
        get(target, prop) {
          if (!(prop in target)) {
            throw new Error(`Properties  is missing`);
          }
          if ('_doc' in target) {
            return target['_doc'][prop];
          }
        },
      });

      const userPayloadId = proxyObject['_doc']['_id'];

      const response = await BlogService.getUserBlog(userPayloadId);

      successResponse(res, `All User Blogs`, 200, response);
    } catch (err) {
      next(err);
    }
  };

  getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await BlogService.getAllBlogs();
      successResponse(res, 'All Blogs Fetches', 201, response);
    } catch (err) {
      next(err);
    }
  };

  updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId ?? '';

      if (blogId.length === 0) {
        throw new ValidationException(403, 'Blog Id Does not provided');
      }
      const userPayload = req.user ?? null;
      if (!userPayload) {
        throw new ValidationException(403, `User is not Authorized`);
      }

      const updateBody: Required<UpdateBlogI> = req.body;

      const result = await BlogService.updateBlogs(
        updateBody as UpdateBlogI,
        blogId as string
      );

      successResponse(res, 'Blog is Updated', 201, result);
    } catch (err) {
      next(err);
    }
  };

  deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const BlogId = req.params.blogId ?? '';
      if (BlogId.length === 0) {
        throw new ValidationException(403, 'Blog ID Does not Provided');
      }
      const response = await BlogService.deleteBlogs(BlogId as string);

      successResponse(res, `Blog is Deleted with ${BlogId}`, 201, response);
    } catch (err) {
      next(err);
    }
  };

  likeBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId ?? '';
      if (blogId.length === 0) {
        throw new DatabaseException(403, `Blog Id is missing`);
      }
      const result = await BlogService.upvoteBlogs(blogId as string);

      successResponse(res, 'Blog has been Up voted', 201, result);
    } catch (err) {
      next(err);
    }
  };

  disLikeBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId ?? '';
      if (blogId.length === 0) {
        throw new DatabaseException(403, 'Blog Id is missing');
      }

      const result = await BlogService.downVote(blogId as string);

      successResponse(res, `Down Voted the Blog`, 201, result);
    } catch (err) {
      next(err);
    }
  };

  makePrivateBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userPayloadId = req.user._doc._id;
      const statusQuery: any = req.query.status;
      const blogsId = req.params.blogId;

      const response = await BlogService.makePrivate(
        statusQuery,
        blogsId,
        userPayloadId
      );
      successResponse(res, 'User make its blog Private', 201, response);
    } catch (err) {
      next(err);
    }
  };
}

export default new BlogController();
