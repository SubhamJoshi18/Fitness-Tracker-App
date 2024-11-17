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

commentRouter.delete(
  '/comment/:commentId',
  verifyAuthToken as any,
  CommentController.deleteComment
);

export default commentRouter;
