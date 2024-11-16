"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToFitnessDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../libs/logger"));
const maxRetries = 5;
const retryDelay = 3000;
const connectToFitnessDB = async () => {
    let retryCount = maxRetries;
    const connect = async () => {
        try {
            await mongoose_1.default.connect('mongodb://localhost:27017/fitnessDB');
        }
        catch (err) {
            logger_1.default.error('Initial MongoDB connection failed', err);
            retryConnection();
        }
    };
    const retryConnection = () => {
        if (retryCount > 0) {
            retryCount -= 1;
            logger_1.default.warn(`Retrying MongoDB connection (${maxRetries - retryCount}/${maxRetries})...`);
            setTimeout(() => connect(), retryDelay);
        }
        else {
            logger_1.default.error('Max retries reached. Could not connect to MongoDB.');
        }
    };
    mongoose_1.default.connection.on('connected', () => {
        logger_1.default.info('MongoDB connected successfully.');
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger_1.default.info('MongoDB disconnected.');
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.default.error('MongoDB connection error:', err);
        retryConnection();
    });
    connect();
};
exports.connectToFitnessDB = connectToFitnessDB;
//# sourceMappingURL=connect.js.map