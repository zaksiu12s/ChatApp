import UserSchema, { IUserSchema } from "../models/userModel";

// Searches database for user with email | name then return user data or null if user not found
// Errors must be handled outside the function (try/catch block)
export async function findUser(username: string): Promise<IUserSchema | null> {
    const userData = await UserSchema.findOne({
        username: username,
    }, { _id: 0, username: 1 });

    if (userData) {
        return userData;
    }

    return null;
}
