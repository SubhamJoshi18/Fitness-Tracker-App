"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const serverMiddleware = (expressApplication) => {
    expressApplication.use(express_1.default.json());
    expressApplication.use(express_1.default.urlencoded({ extended: true }));
    expressApplication.use((0, morgan_1.default)('dev'));
};
exports.serverMiddleware = serverMiddleware;
//# sourceMappingURL=server.middleware.js.map