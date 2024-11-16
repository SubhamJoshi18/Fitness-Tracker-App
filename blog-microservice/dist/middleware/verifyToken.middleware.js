"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../libs/logger"));
const getKey_1 = require("../utils/getKey");
const verifyAuthToken = (req, res, next) => {
    const authToken = req.headers['authorization'] ?? req.headers.authorization;
    console.log('This is the auth token', authToken);
    if (!authToken) {
        logger_1.default.error(`Auth token is missing or it is not valid`);
        process.exit(1);
    }
    const secretKey = (0, getKey_1.getEnvValue)('SECRET');
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(authToken, secretKey, (err, payload) => {
            if (err) {
                logger_1.default.error('Error validaiting the access token');
                throw err;
            }
            else {
                req.user = JSON.parse(JSON.stringify(payload));
                logger_1.default.info(`Token is valid, Shifting to next Middleware`);
                next();
            }
        });
    });
};
exports.verifyAuthToken = verifyAuthToken;
//# sourceMappingURL=verifyToken.middleware.js.map