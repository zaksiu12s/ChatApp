import { Server } from 'http';

import app from './app';
import { setupSocket } from './listeners/socket';
import connectToMongoDB from './config/db';

// Setting up express server and application
connectToMongoDB();
const server: Server = app.listen(8000);
setupSocket(server);