"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../controller/types");
const reviewSchema = new mongoose_1.default.Schema({
    rating: {
        type: Number,
        enum: types_1.ReviewRatingEnum,
        default: 0,
    },
});
const reviewModel = mongoose_1.default.model('Review', reviewSchema);
exports.default = reviewModel;
//# sourceMappingURL=review.schema.js.map