import {type UserDB, UserRole} from "@src/types/index.js";
import mongoose, {type Schema, type Model} from "mongoose";

const UserModelShema: Schema<UserDB> = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }
}, {
    timestamps: true
});

UserModelShema.index({email: 1}, {unique: true});

const UserModel: Model<UserDB> = mongoose.models.User || mongoose.model<UserDB>("User", UserModelShema, "users");

export {UserModelShema, UserModel};