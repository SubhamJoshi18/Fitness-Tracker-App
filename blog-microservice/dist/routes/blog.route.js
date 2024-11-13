"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const blogController_1 = __importDefault(require("../controller/blogController"));
const blogRouter = (0, express_1.Router)();
blogRouter.post('/create', verifyToken_middleware_1.verifyAuthToken, blogController_1.default.createBlog);
exports.default = blogRouter;
//# sourceMappingURL=blog.route.js.map