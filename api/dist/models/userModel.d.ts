export interface IUserSchema {
    _id?: string;
    username: string;
}
declare const User: import("mongoose").Model<IUserSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, IUserSchema> & IUserSchema & Required<{
    _id: string;
}> & {
    __v?: number;
}, any>;
export default User;
