"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorMiddleware = void 0;
const errConstant_1 = require("../constants/errConstant");
const exceptions_1 = require("../exceptions");
const exceptions_2 = require("../exceptions");
const exceptions_3 = require("../exceptions");
const logger_1 = __importDefault(require("../libs/logger"));
const globalErrorMiddleware = (err, req, res, next) => {
    if (err.name === errConstant_1.UnAuthorizedException && err instanceof exceptions_1.UnAuthorizedException) {
        logger_1.default.error(`Un Authorized Exception expected!!...`);
        return res.status(err.getStatusNumber()).json({
            err_message: err.getMessage(),
            error: true,
        });
    }
    else if (err.name === errConstant_1.ValidationException &&
        err instanceof exceptions_3.ValidationException) {
        logger_1.default.error(`Validation Exception expected!!...`);
        return res.status(err.getStatusNumber()).json({
            err_message: err.getMessage(),
            error: true,
        });
    }
    else if (err.name === errConstant_1.DatabaseException && err instanceof exceptions_2.DatabaseException) {
        logger_1.default.error(`Database Exception expected!!...`);
        return res.status(err.getStatusNumber()).json({
            err_message: err.getMessage(),
            error: true,
        });
    }
    return res.status(500).json({
        message: err.message,
        error: true,
    });
};
exports.globalErrorMiddleware = globalErrorMiddleware;
//# sourceMappingURL=global.middleware.js.map