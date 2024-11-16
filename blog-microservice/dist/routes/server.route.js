"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRouter = void 0;
const blog_route_1 = __importDefault(require("./blog.route"));
const comment_route_1 = __importDefault(require("./comment.route"));
const global_middleware_1 = require("../middleware/global.middleware");
const serverRouter = (expressApplication) => {
    expressApplication.use('/api', [blog_route_1.default, comment_route_1.default]);
    expressApplication.use('*', (req, res) => {
        res.status(404).json({
            message: `${req.originalUrl} Does not Exists`,
        });
    });
    expressApplication.use(global_middleware_1.globalErrorMiddleware);
};
exports.serverRouter = serverRouter;
//# sourceMappingURL=server.route.js.map