"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)(":8000");
// Define event handlers
socket.on('connection', () => {
    console.log("Connected to server");
});
//# sourceMappingURL=index.js.map