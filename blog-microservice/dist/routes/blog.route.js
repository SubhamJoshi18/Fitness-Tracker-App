"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const blogController_1 = __importDefault(require("../controller/blogController"));
const blogRouter = (0, express_1.Router)();
blogRouter.post('/blog', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.createBlog);
blogRouter.get('/blog', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.getAllBlogs);
blogRouter.get('/blog/user', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.getUserBlog);
blogRouter.patch('/blog/:blogId', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.updateBlog);
blogRouter.patch('/blog/like/:blogId', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.likeBlog);
blogRouter.patch('/blog/unlike/:blogId', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.disLikeBlog);
blogRouter.put('/blog/private/:blogId', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.makePrivateBlogs);
exports.default = blogRouter;
//# sourceMappingURL=blog.route.js.map