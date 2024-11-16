"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blog_schema_1 = __importDefault(require("../database/blog.schema"));
const exceptions_1 = require("../exceptions");
const types_1 = require("../database/types");
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
        console.log('This is the user id', userId);
        const newBlog = await blog_schema_1.default.create({
            user: userId,
            title: data.title,
            description: data.description,
            workoutType: data.workoutType,
        });
        return newBlog;
    }
    async getUserBlog(userId) {
        const userBlogs = await blog_schema_1.default.find({
            user: userId,
        });
        const isValidBlogs = Array.isArray(userBlogs) && userBlogs.length > 0;
        if (!isValidBlogs) {
            throw new exceptions_1.DatabaseException(404, 'No Blog Found For User');
        }
        const query = {
            user: userId,
        };
        const countUserBlgos = await blog_schema_1.default.countDocuments(query);
        if (countUserBlgos.toString().startsWith('0')) {
            throw new exceptions_1.ValidationException(404, 'No Blog Found For User');
        }
        return userBlogs;
    }
    async getAllBlogs() {
        const response = await blog_schema_1.default.find({});
        if (!response) {
            throw new exceptions_1.DatabaseException(404, 'No Blog Found');
        }
        return response;
    }
    async updateBlogs(data, blogId) {
        const isBlog = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        if (!blogId) {
            throw new exceptions_1.DatabaseException(403, `Blog Does not Exists`);
        }
        const extractUserId = (data) => {
            return data['user'];
        };
        const updateBlogBody = JSON.parse(JSON.stringify(data));
        const userId = extractUserId(isBlog);
        const fetchUser = await mongoose_1.default.connection.collection('users').findOne({
            _id: userId,
        });
        const toBeResovled = await blog_schema_1.default.updateOne({
            _id: blogId,
        }, {
            title: updateBlogBody?.title,
            description: updateBlogBody?.description,
        }, {
            $new: true,
        });
        const result = `${fetchUser.username} Has Updated the Post with ID : ${isBlog._id}`;
        return result;
    }
    async deleteBlogs(blogId) {
        let isBlogValid = false;
        const blogDocuments = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        if (Object.entries(blogDocuments).length > 0) {
            isBlogValid = true;
        }
        if (!isBlogValid) {
            throw new exceptions_1.DatabaseException(403, 'Error Blog is Empty or Document is Empty');
        }
        const deleteDocument = await blog_schema_1.default.deleteOne({
            _id: blogId,
        });
        return deleteDocument.deletedCount > 0 ? 'Deleted' : 'Not Deleted';
    }
    async upvoteBlogs(blogId) {
        const blogDocument = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        const proxyDocument = JSON.parse(JSON.stringify(blogDocument));
        if (Object.entries(blogDocument).length === 0) {
            throw new exceptions_1.DatabaseException(403, 'Blog Document is Empty');
        }
        const result = proxyDocument.hasOwnProperty('upVote');
        const userDetails = await this.getUserDetails(blogDocument);
        if (result) {
            const modifiedLike = blogDocument.upVote + 1;
            const result = await blog_schema_1.default.updateOne({
                _id: blogId,
            }, {
                upVote: modifiedLike,
            });
            return result.modifiedCount > 0
                ? `${userDetails.username} has liked Post Id :  ${blogDocument['_id']}`
                : null;
        }
        return null;
    }
    async downVote(blogId) {
        const blogDocument = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        const proxyDocument = JSON.parse(JSON.stringify(blogDocument));
        if (Object.entries(blogDocument).length === 0) {
            throw new exceptions_1.DatabaseException(403, 'Blog Document is Empty');
        }
        const result = proxyDocument.hasOwnProperty('downVote');
        const userDetails = await this.getUserDetails(blogDocument);
        if (result) {
            const modifiedLike = blogDocument.downVote + 1;
            const result = await blog_schema_1.default.updateOne({
                _id: blogId,
            }, {
                downVote: modifiedLike,
            });
            return result.modifiedCount > 0
                ? `${userDetails.username} has liked Post Id :  ${blogDocument['_id']}`
                : null;
        }
        return null;
    }
    async makePrivate(statusQuery, blogId, userId) {
        if (!(statusQuery === types_1.BlogStatus.PRIVATE)) {
            throw new exceptions_1.ValidationException(403, `You are not trying to make it as a Private`);
        }
        const blogDocument = await blog_schema_1.default.findOne({
            _id: blogId,
        });
        if (!blogId) {
            throw new exceptions_1.DatabaseException(403, 'Blog Document Does not Exists');
        }
        //check if it is already private
        const isAlreadyPrivate = blogDocument.blogStatus === types_1.BlogStatus.PRIVATE;
        if (isAlreadyPrivate) {
            throw new exceptions_1.DatabaseException(403, 'The Blog is Already Private');
        }
        const updatedData = async (status) => {
            return await blog_schema_1.default.updateOne({
                _id: blogId,
            }, {
                blogStatus: types_1.BlogStatus.PRIVATE,
            });
        };
        const updatedResult = await updatedData(statusQuery);
        return updatedResult;
    }
    async getUserDetails(blogDocument) {
        const userId = blogDocument.user;
        const userPayload = await mongoose_1.default.connection.collection('users').findOne({
            _id: userId,
        });
        return userPayload;
    }
}
exports.default = new BlogService();
//# sourceMappingURL=blog.service.js.map