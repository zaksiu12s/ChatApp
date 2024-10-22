"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        auto: true,
    },
    value: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    senderUsername: {
        type: String,
        required: true,
    }
});
const Message = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = Message;
//# sourceMappingURL=messageModel.js.map