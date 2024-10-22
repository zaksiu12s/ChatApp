import { Schema, model, Types } from 'mongoose';

export interface IMessageSchema {
    _id?: string,
    value: string,
    createdAt?: Date,
    senderUsername: string,
}

const MessageSchema = new Schema<IMessageSchema>({
    _id: {
        type: Types.ObjectId,
        auto: true,
    },
    value: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    senderUsername: {
        type: String,
        required: true,
    }
})

const Message = model<IMessageSchema>('Message', MessageSchema);
export default Message;