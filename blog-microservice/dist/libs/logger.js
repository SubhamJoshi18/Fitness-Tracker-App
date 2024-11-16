"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, printf } = winston_1.default.format;
/**
 * Creates a logger instance with the specified service name.
 * @param service - The name of the service.
 * @returns A winston.Logger instance.
 */
function createLogger(service) {
    return winston_1.default.createLogger({
        levels: winston_1.default.config.syslog.levels,
        defaultMeta: {
            service,
        },
        transports: [new winston_1.default.transports.Console()],
    });
}
const fitnessLogger = createLogger('fitnessLogger');
exports.default = fitnessLogger;
//# sourceMappingURL=logger.js.map