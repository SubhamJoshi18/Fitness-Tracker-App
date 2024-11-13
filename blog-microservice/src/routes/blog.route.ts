import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken.middleware';
import BlogController from '../controller/blogController';

const blogRouter = Router();

blogRouter.post('/create', verifyAuthToken as any, BlogController.createBlog);

export default blogRouter;
