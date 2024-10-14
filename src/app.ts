import express, { Application } from 'express';

// Importing routes from routes directory
import userRouter from "./routes/v1/userRouter";

// Setting up express application
const app: Application = express();

// Setting up express middleware
app.use(express.static('public'));
app.use(express.json());

// Setting up routes 
app.use("/api/v1/users", userRouter);

export default app;
