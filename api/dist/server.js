"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./listeners/socket");
const db_1 = __importDefault(require("./config/db"));
// Setting up express server and application
(0, db_1.default)();
const server = app_1.default.listen(8000);
(0, socket_1.setupSocket)(server);
//# sourceMappingURL=server.js.map