import { IUserSchema } from "../models/userModel";
export declare function findUser(username: string): Promise<IUserSchema | null>;
