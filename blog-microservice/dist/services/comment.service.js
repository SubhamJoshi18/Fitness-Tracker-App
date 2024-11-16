"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blog_schema_1 = __importDefault(require("../database/blog.schema"));
const exceptions_1 = require("../exceptions");
const comment_schema_1 = __importDefault(require("../database/comment.schema"));
const logger_1 = __importDefault(require("../libs/logger"));
class CommentService {
    async commentBlog(commentBody, blogId, userId) {
        const existsBlogDocument = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        if (!existsBlogDocument || typeof existsBlogDocument == null) {
            throw new exceptions_1.DatabaseException(403, 'Blog Document is Empty');
        }
        console.log('This is the user id', userId);
        const existsUser = await mongoose_1.default.connection
            .collection('users')
            .findOne({ _id: new mongoose_1.default.Types.ObjectId(userId) });
        console.log('This is the user exists', existsUser);
        if (!existsUser) {
            throw new exceptions_1.DatabaseException(403, `User does not exists in the Mongo`);
        }
        const paylaod = {
            commentBody,
            blogId,
            userId,
        };
        const insertComment = async (commentPayload) => {
            try {
                const commentResult = await comment_schema_1.default.create({
                    comment: commentBody.comment,
                    user: userId,
                    blog: blogId,
                });
                return commentResult;
            }
            catch (err) {
                throw new exceptions_1.DatabaseException(403, err);
            }
        };
        const commentResult = await insertComment(paylaod);
        logger_1.default.info(`Saving Comment in the Blog`);
        existsBlogDocument.comments.push(commentResult._id);
        await existsBlogDocument.save();
        return commentResult;
    }
    async getCommentBlog(blogId) {
        const blogs = await comment_schema_1.default
            .findOne({
            blog: blogId,
        })
            .populate('blog');
        if (!blogs) {
            throw new exceptions_1.DatabaseException(403, 'Comment Blog Does not Exists');
        }
        return blogs;
    }
}
exports.default = new CommentService();
//# sourceMappingURL=comment.service.js.map