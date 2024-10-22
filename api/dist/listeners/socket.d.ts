import { Server as SocketIOServer } from 'socket.io';
import "dotenv/config";
export declare const setupSocket: (server: any) => SocketIOServer<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
