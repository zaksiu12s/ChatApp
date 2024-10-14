"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importing routes from routes directory
const userRouter_1 = __importDefault(require("./routes/v1/userRouter"));
// Setting up express application
const app = (0, express_1.default)();
// Setting up express middleware
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
// Setting up routes 
app.use("/api/v1/users", userRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map