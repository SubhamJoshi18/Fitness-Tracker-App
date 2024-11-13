"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./libs/logger"));
const server_route_1 = require("./routes/server.route");
const server_middleware_1 = require("./middleware/server.middleware");
const connect_1 = require("./database/connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, server_middleware_1.serverMiddleware)(app);
(0, server_route_1.serverRouter)(app);
(0, connect_1.connectToFitnessDB)().then(() => {
    app
        .listen(port, () => {
        logger_1.default.info(`Blog Server is running on ${port}`);
    })
        .on('error', (err) => {
        logger_1.default.error(`Error starting the Blog Server : ${err}`);
    });
});
//# sourceMappingURL=index.js.map