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
    }
}
exports.default = new BlogController();
//# sourceMappingURL=blogController.js.map