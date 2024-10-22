import express, { Application } from 'express';
import cors from 'cors';

// Importing routes from routes directory
import userRouter from "./routes/v1/userRouter";

// Setting up express application
const app: Application = express();

// Setting up express middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

// Setting up routes 
app.use("/api/v1/users", userRouter);

export default app;
