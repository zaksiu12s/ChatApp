import mongoose, { Mongoose } from "mongoose";

// Specifies the mongoDB port
let MONGO_URI: string = "mongodb://localhost:27017/ChatApp";

console.log(MONGO_URI);

// Tries to connect to DB with specified PORT
//  - If succeeds returns 1 and logs the DB host
//  - If fails then returns 0 and logs an error
const connectToMongoDB = async (): Promise<boolean> => {
    try {
        const conn: Mongoose = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
        return true;
    } catch (err) {
        console.error(`Error: ${err}`)
    }

    // Returns false if connection fails
    return false;
}

export default connectToMongoDB;