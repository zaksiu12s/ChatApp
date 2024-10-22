"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const messages = ["Hello", "welcome", "hi"];
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        }
    });
    io.on('connection', (socket) => {
        console.log(`Client connected with id: ${socket.id}`);
        io.emit('getMessages', messages);
        socket.on('sendMessage', async (message) => {
            if (typeof message !== 'string')
                return;
            messages.push(message);
            io.emit('getMessages', messages);
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.setupSocket = setupSocket;
//# sourceMappingURL=socket.js.map