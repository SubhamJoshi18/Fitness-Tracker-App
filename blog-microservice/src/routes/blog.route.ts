import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken.middleware';
import BlogController from '../controller/blogController';

const blogRouter = Router();

blogRouter.post('/blog', verifyAuthToken as any, BlogController.createBlog);

blogRouter.get('/blog', verifyAuthToken as any, BlogController.getAllBlogs);

blogRouter.get(
  '/blog/user',
  verifyAuthToken as any,
  BlogController.getUserBlog
);

blogRouter.patch(
  '/blog/:blogId',
  verifyAuthToken as any,
  BlogController.updateBlog
);

blogRouter.patch(
  '/blog/like/:blogId',
  verifyAuthToken as any,
  BlogController.likeBlog
);

blogRouter.patch(
  '/blog/unlike/:blogId',
  verifyAuthToken as any,
  BlogController.disLikeBlog
);

blogRouter.put(
  '/blog/private/:blogId',
  verifyAuthToken as any,
  BlogController.makePrivateBlogs
);

export default blogRouter;
