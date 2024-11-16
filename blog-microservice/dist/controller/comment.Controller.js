"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const comment_service_1 = __importDefault(require("../services/comment.service"));
const successResponse_1 = require("../utils/successResponse");
class CommentController {
    constructor() {
        this.commentBlog = async (req, res, next) => {
            try {
                const commentBody = req.body;
                const userPayload = req.user ?? null;
                const userId = await this.extractUserId(userPayload);
                const blogId = req.params.blogId ?? null;
                if (!blogId) {
                    throw new exceptions_1.DatabaseException(403, 'Error in Commenting to the Blog');
                }
                const response = await comment_service_1.default.commentBlog(commentBody, blogId, userId);
                (0, successResponse_1.successResponse)(res, 'User Comment on the Blogs', 201, response);
            }
            catch (err) {
                next(err);
            }
        };
        this.getCommentBlog = async (req, res, next) => {
            try {
                const blogId = req.params.blogId ?? null;
                if (!blogId) {
                    throw new exceptions_1.DatabaseException(403, 'Blog id is not present in the params');
                }
                const response = await comment_service_1.default.getCommentBlog(blogId);
                (0, successResponse_1.successResponse)(res, 'Blog Comment Details', 201, response);
            }
            catch (err) {
                next(err);
            }
        };
    }
    async extractUserId(userPayload) {
        let validBlog = [];
        const proxyDocument = JSON.parse(JSON.stringify(userPayload));
        if (proxyDocument.hasOwnProperty('_doc')) {
            validBlog.push(proxyDocument['_doc']['_id']);
        }
        return validBlog[0];
    }
}
exports.default = new CommentController();
//# sourceMappingURL=comment.Controller.js.map