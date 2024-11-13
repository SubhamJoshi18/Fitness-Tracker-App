"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvValue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../libs/logger"));
dotenv_1.default.config();
const checkValidKey = (key) => {
    let validKey = false;
    if (process.env[key] && process.env.hasOwnProperty(key)) {
        validKey = true;
    }
    return validKey;
};
const getEnvValue = (key) => {
    if (!checkValidKey(key)) {
        logger_1.default.error(`${key} you provided does not exists in .env`);
        process.exit(1);
    }
    return process.env[key] ?? process.env?.key;
};
exports.getEnvValue = getEnvValue;
//# sourceMappingURL=getKey.js.map