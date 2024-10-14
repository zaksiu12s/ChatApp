"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageServices_1 = require("../services/messageServices");
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY || "secret";
const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
const users = {};
// Setting up socket.io server and application for handling WebSocket connections and events.
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        }
    });
    // Handling WebSocket events such as connection, registration, sending messages, and disconnecting clients.
    io.on('connection', async (socket) => {
        console.log(`Client connected with id: ${socket.id}`);
        io.emit('getMessages', await (0, messageServices_1.findAllMessages)());
        // Registering endpoint for WebSocket
        socket.on('register', async (token) => {
            // Validation of sent data from user
            if (typeof token !== "string") {
                // Send feedback to the client
                io.to(socket.id).emit('error', { message: 'Token is not a string', status: 400 });
                return;
            }
            ;
            // JWT token validation and extracting username
            try {
                const username = await verifyToken(token, SECRET_KEY);
                console.log(username);
                const usernames = users[username];
                if (usernames) {
                    usernames.push(socket.id);
                }
                else {
                    users[username] = [socket.id];
                }
                io.to(socket.id).emit('success', { message: "Registration successful", status: 200 });
            }
            catch (error) {
                // Send feedback to the client
                io.to(socket.id).emit('error', { message: 'Token validation failed', status: 401 });
                return;
            }
        });
        // socket.on("sendPrivateMessage", (message: any, recipient: any) => {
        //     if (typeof message !== "string" || typeof recipient !== "string") return;
        //     const recipientSocketIds = users[recipient];
        //     if (!recipientSocketIds) return;
        //     io.to(recipientSocketIds).emit('getMessages', message);
        // })
        socket.on('sendMessage', async ({ value, senderUsername }) => {
            if (!value || !senderUsername || typeof value !== 'string' || typeof senderUsername !== 'string') {
                io.to(socket.id).emit('error', { message: "Invalid username or message", status: 400 });
                return;
            }
            ;
            const message = new messageModel_1.default({
                value,
                senderUsername
            });
            // Saving user to mongoDB database
            try {
                await message.save();
                io.to(socket.id).emit('success', { message: "Message sent successfully", status: 200 });
                const messages = await (0, messageServices_1.findAllMessages)();
                io.emit('getMessages', messages);
            }
            catch (err) {
                io.to(socket.id).emit('error', { message: "Internal server error", status: 500 });
                return;
            }
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.setupSocket = setupSocket;
//# sourceMappingURL=socket.js.map