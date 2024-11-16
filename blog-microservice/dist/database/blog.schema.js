"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../controller/types");
const types_2 = require("./types");
const blogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    workoutType: {
        type: String,
        enum: types_1.workoutTypeEnum,
        required: [true, 'Post must have a workout type'],
    },
    upVote: {
        type: Number,
        default: 0,
        required: false,
    },
    downVote: {
        type: Number,
        default: 0,
        required: false,
    },
    blogStatus: {
        type: String,
        default: types_2.BlogStatus.ARCHIEVE,
        enum: types_2.BlogStatus,
        required: false,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Comment',
            required: false,
        },
    ],
    review: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Review',
        required: false,
    },
}, {
    timestamps: true,
});
const blogModel = mongoose_1.default.model('Blog', blogSchema);
exports.default = blogModel;
//# sourceMappingURL=blog.schema.js.map