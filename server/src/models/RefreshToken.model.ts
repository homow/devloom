import type {RefreshToken} from "@src/types/index.js";
import mongoose, {type Model, type Schema, Types} from "mongoose";

const RefreshTokenModelSchema: Schema<RefreshToken> = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "Users",
        required: true,
    },
    isRevoked: {
        type: Boolean,
        required: true,
        default: false,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, {timestamps: true});

RefreshTokenModelSchema.index({userId: 1});
RefreshTokenModelSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

const RefreshTokenModel: Model<RefreshToken> = mongoose.models.RefreshToken || mongoose.model("RefreshToken", RefreshTokenModelSchema, "refresh_tokens");

export default RefreshTokenModel;