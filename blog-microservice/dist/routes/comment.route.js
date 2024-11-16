"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const comment_Controller_1 = __importDefault(require("../controller/comment.Controller"));
const commentRouter = (0, express_1.Router)();
commentRouter.post('/comment/:blogId', verifyToken_middleware_1.verifyAuthToken, comment_Controller_1.default.commentBlog);
commentRouter.get('/comments/:blogId', verifyToken_middleware_1.verifyAuthToken, comment_Controller_1.default.getCommentBlog);
exports.default = commentRouter;
//# sourceMappingURL=comment.route.js.map