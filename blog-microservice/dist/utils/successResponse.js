"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (res, message, statusCode, data) => {
    return res.status(201).json({
        message: message,
        data: data,
    });
};
exports.successResponse = successResponse;
//# sourceMappingURL=successResponse.js.map