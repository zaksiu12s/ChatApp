import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message, { IMessageSchema } from '../models/messageModel';
import { findAllMessages } from '../services/messageServices';
import "dotenv/config"

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const verifyToken = (token: string, secretKey: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};


const users: { [username: string]: string[] } = {};

// Setting up socket.io server and application for handling WebSocket connections and events.
export const setupSocket = (server: any) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: '*',
        }
    });

    // Handling WebSocket events such as connection, registration, sending messages, and disconnecting clients.
    io.on('connection', async (socket) => {
        console.log(`Client connected with id: ${socket.id}`);
        io.emit('getMessages', await findAllMessages());

        // Registering endpoint for WebSocket
        socket.on('register', async (token: any) => {
            // Validation of sent data from user
            if (typeof token !== "string") {
                // Send feedback to the client
                io.to(socket.id).emit('error', { message: 'Token is not a string', status: 400 });
                return
            };

            // JWT token validation and extracting username
            try {
                const username = await verifyToken(token, SECRET_KEY);
                console.log(username);
                const usernames = users[username];

                if (usernames) {
                    usernames.push(socket.id);
                } else {
                    users[username] = [socket.id];
                }

                io.to(socket.id).emit('success', { message: "Registration successful", status: 200 });
            } catch (error) {
                // Send feedback to the client
                io.to(socket.id).emit('error', { message: 'Token validation failed', status: 401 });
                return
            }
        })

        // socket.on("sendPrivateMessage", (message: any, recipient: any) => {
        //     if (typeof message !== "string" || typeof recipient !== "string") return;

        //     const recipientSocketIds = users[recipient];
        //     if (!recipientSocketIds) return;

        //     io.to(recipientSocketIds).emit('getMessages', message);
        // })

        socket.on('sendMessage', async ({ value, senderUsername }) => {
            if (!value || !senderUsername || typeof value !== 'string' || typeof senderUsername !== 'string') {
                io.to(socket.id).emit('error', { message: "Invalid username or message", status: 400 });
                return
            };

            const message = new Message<IMessageSchema>({
                value,
                senderUsername
            });

            // Saving user to mongoDB database
            try {
                await message.save();

                io.to(socket.id).emit('success', { message: "Message sent successfully", status: 200 });
                const messages = await findAllMessages();

                io.emit('getMessages', messages);
            }
            catch (err) {
                io.to(socket.id).emit('error', { message: "Internal server error", status: 500 });
                return;
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};
