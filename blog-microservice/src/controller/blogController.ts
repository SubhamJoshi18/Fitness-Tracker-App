import type, { NextFunction, Request, Response } from 'express';
import { CreateBlogI } from './types';
import { ValidationException } from '../exceptions';
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
}

export default new BlogController();
