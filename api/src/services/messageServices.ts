import MessageSchema, { IMessageSchema } from "../models/messageModel";

// Searches database for user with email | name then return user data or null if user not found
// Errors must be handled outside the function (try/catch block)
export async function findAllMessages(): Promise<IMessageSchema[] | null> {
    const userData = await MessageSchema.find({}, { _id: 0, value: 1, senderUsername: 1, createdAt: 1 }).limit(100);

    if (userData) {
        return userData;
    }

    return null;
}
