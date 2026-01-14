import {type UserDB} from "@src/types/index.js";
import mongoose, {type Schema, type Model} from "mongoose";

export type BanUserDB = Omit<UserDB, "name" | "password" | "role"> & {
    reason: string;
};

export const BanUserModelShema: Schema<BanUserDB> = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        reason: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

BanUserModelShema.index({email: 1}, {unique: true});

export const BanUserModel: Model<BanUserDB> = mongoose.models.BanUser || mongoose.model<BanUserDB>("BanUser", BanUserModelShema, "banned_users");