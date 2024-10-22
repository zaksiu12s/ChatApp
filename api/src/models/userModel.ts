import { Schema, model, Types } from 'mongoose';

export interface IUserSchema {
    _id?: string,
    username: string,
}

const UserSchema = new Schema<IUserSchema>({
    _id: {
        type: Types.ObjectId,
        auto: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    }
})

const User = model<IUserSchema>('User', UserSchema);
export default User;