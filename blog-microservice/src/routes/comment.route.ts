import { Router } from 'express';
import { verifyAuthToken } from '../middleware/verifyToken.middleware';
import CommentController from '../controller/comment.Controller';

const commentRouter = Router();

commentRouter.post(
  '/comment/:blogId',
  verifyAuthToken as any,
  CommentController.commentBlog
);

commentRouter.get(
  '/comments/:blogId',
  verifyAuthToken as any,
  CommentController.getCommentBlog
);

export default commentRouter;
