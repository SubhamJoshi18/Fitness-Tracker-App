"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const blog_service_1 = __importDefault(require("../services/blog.service"));
const successResponse_1 = require("../utils/successResponse");
class BlogController {
    constructor() {
        this.createBlog = async (req, res, next) => {
            try {
                const userPayload = req.user ?? null;
                if (!userPayload) {
                    throw new exceptions_1.ValidationException(403, `User is not Authorized`);
                }
                const blogBody = req.body;
                console.log(blogBody);
                const proxyBlogBody = new Proxy(blogBody, {
                    get(target, prop) {
                        if (!(prop in target) || target[prop] == '')
                            throw new exceptions_1.ValidationException(403, `Properties are Empty`);
                        return target[prop];
                    },
                });
                const result = await blog_service_1.default.createBlog(proxyBlogBody, userPayload);
                (0, successResponse_1.successResponse)(res, `User Created an Blog Successfully`, 201, result);
            }
            catch (err) {
                next(err);
            }
        };
        this.getUserBlog = async (req, res, next) => {
            try {
                const userPayload = req.user ?? null;
                if (!userPayload) {
                    throw new exceptions_1.ValidationException(403, 'User payload is missing');
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
                const response = await blog_service_1.default.getUserBlog(userPayloadId);
                (0, successResponse_1.successResponse)(res, `All User Blogs`, 200, response);
            }
            catch (err) {
                next(err);
            }
        };
        this.getAllBlogs = async (req, res, next) => {
            try {
                const response = await blog_service_1.default.getAllBlogs();
                (0, successResponse_1.successResponse)(res, 'All Blogs Fetches', 201, response);
            }
            catch (err) {
                next(err);
            }
        };
        this.updateBlog = async (req, res, next) => {
            try {
                const blogId = req.params.blogId ?? '';
                if (blogId.length === 0) {
                    throw new exceptions_1.ValidationException(403, 'Blog Id Does not provided');
                }
                const userPayload = req.user ?? null;
                if (!userPayload) {
                    throw new exceptions_1.ValidationException(403, `User is not Authorized`);
                }
                const updateBody = req.body;
                const result = await blog_service_1.default.updateBlogs(updateBody, blogId);
                (0, successResponse_1.successResponse)(res, 'Blog is Updated', 201, result);
            }
            catch (err) {
                next(err);
            }
        };
        this.deleteBlog = async (req, res, next) => {
            try {
                const BlogId = req.params.blogId ?? '';
                if (BlogId.length === 0) {
                    throw new exceptions_1.ValidationException(403, 'Blog ID Does not Provided');
                }
                const response = await blog_service_1.default.deleteBlogs(BlogId);
                (0, successResponse_1.successResponse)(res, `Blog is Deleted with ${BlogId}`, 201, response);
            }
            catch (err) {
                next(err);
            }
        };
        this.likeBlog = async (req, res, next) => {
            try {
                const blogId = req.params.blogId ?? '';
                if (blogId.length === 0) {
                    throw new exceptions_1.DatabaseException(403, `Blog Id is missing`);
                }
                const result = await blog_service_1.default.upvoteBlogs(blogId);
                (0, successResponse_1.successResponse)(res, 'Blog has been Up voted', 201, result);
            }
            catch (err) {
                next(err);
            }
        };
        this.disLikeBlog = async (req, res, next) => {
            try {
                const blogId = req.params.blogId ?? '';
                if (blogId.length === 0) {
                    throw new exceptions_1.DatabaseException(403, 'Blog Id is missing');
                }
                const result = await blog_service_1.default.downVote(blogId);
                (0, successResponse_1.successResponse)(res, `Down Voted the Blog`, 201, result);
            }
            catch (err) {
                next(err);
            }
        };
        this.makePrivateBlogs = async (req, res, next) => {
            try {
                const userPayloadId = req.user._doc._id;
                const statusQuery = req.query.status;
                const blogsId = req.params.blogId;
                const response = await blog_service_1.default.makePrivate(statusQuery, blogsId, userPayloadId);
                (0, successResponse_1.successResponse)(res, 'User make its blog Private', 201, response);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = new BlogController();
//# sourceMappingURL=blogController.js.map