"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_schema_1 = __importDefault(require("../database/blog.schema"));
const exceptions_1 = require("../exceptions");
class BlogServiceAbs {
}
class BlogService extends BlogServiceAbs {
    validWorkoutDetails(data) {
        if (Object.entries(data).length > 0) {
            return true;
        }
        return false;
    }
    async createBlog(data, userPayload) {
        const userId = userPayload['_doc']['_id'];
        const validData = this.validWorkoutDetails(data);
        if (!validData) {
            throw new exceptions_1.ValidationException(403, `Properties are Empty`);
        }
        console.log('User Id', userId);
        const newBlog = new blog_schema_1.default({
            user: userId,
            ...data,
        });
        const savedResult = await newBlog.save();
        return savedResult;
    }
}
exports.default = new BlogService();
//# sourceMappingURL=blog.service.js.map