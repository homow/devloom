import type {RefreshToken} from "@src/types/index.js";
import {type Model, model, models, Schema, Types} from "mongoose";

const RefreshTokenModelSchema: Schema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
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

const RefreshTokenModel: Model<RefreshToken> =
    models.RefreshToken
    || model("RefreshToken", RefreshTokenModelSchema, "refresh-tokens");

export default RefreshTokenModel;