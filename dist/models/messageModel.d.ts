export interface IMessageSchema {
    _id?: string;
    value: string;
    createdAt?: Date;
    senderUsername: string;
}
declare const Message: import("mongoose").Model<IMessageSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, IMessageSchema> & IMessageSchema & Required<{
    _id: string;
}> & {
    __v?: number;
}, any>;
export default Message;
