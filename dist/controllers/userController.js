"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = require("../services/userServices");
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY || "secret";
const login = async (req, res) => {
    // Validate request query parameters
    if (typeof req.query.username !== 'string') {
        res.status(400).json({ error: 'Invalid username' });
        return;
    }
    const username = req.query.username.trim();
    try {
        const user = await (0, userServices_1.findUser)(username);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign(user.username, SECRET_KEY);
        console.log(token);
        res.json({ token, senderUsername: username });
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
exports.login = login;
const userData = async (req, res) => {
    res.send({ username: req.user });
};
exports.userData = userData;
//# sourceMappingURL=userController.js.map