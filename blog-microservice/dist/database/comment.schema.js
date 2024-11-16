"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        requried: [true, 'Please provide a comment'],
    },
    comment_like: {
        type: Number,
        default: 0,
    },
    blog: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Blog',
        required: false,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    comment_reply: [
        {
            type: String,
            required: false,
        },
    ],
});
const commentModel = mongoose_1.default.model('Comment', commentSchema);
exports.default = commentModel;
//# sourceMappingURL=comment.schema.js.map