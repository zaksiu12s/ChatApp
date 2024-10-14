"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Importing controllers
const userController_1 = require("../../controllers/userController");
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, "HELLO", (err, decoded) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = decoded;
        next();
        return;
    });
};
const router = (0, express_1.Router)();
// router.get('/userData', authenticateToken, userData);
router.post('/', userController_1.login);
exports.default = router;
//# sourceMappingURL=userRouter.js.map