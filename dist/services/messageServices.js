"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMessages = findAllMessages;
const messageModel_1 = __importDefault(require("../models/messageModel"));
// Searches database for user with email | name then return user data or null if user not found
// Errors must be handled outside the function (try/catch block)
async function findAllMessages() {
    const userData = await messageModel_1.default.find({}, { _id: 0, value: 1, senderUsername: 1, createdAt: 1 }).limit(100);
    if (userData) {
        return userData;
    }
    return null;
}
//# sourceMappingURL=messageServices.js.map