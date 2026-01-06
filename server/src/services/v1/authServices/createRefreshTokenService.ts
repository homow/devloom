import mongoose, {Types} from "mongoose";
import type {ServiceResponse} from "@src/types/index.js";
import RefreshTokenModel from "@models/RefreshToken.model.js";

export async function createRefreshTokenService(
    userId: Types.ObjectId | string,
): Promise<ServiceResponse> {
    const isValidId: boolean = mongoose.isValidObjectId(userId);

    if (!isValidId) return {
        status: 400,
        data: {
            ok: false,
            message: "Invalid id"
        }
    };
}

export async function findRefreshToken(token: string) {
    return RefreshTokenModel
        .findOne({token, isRevoked: false})
        .lean();
}

export async function updateRefreshToken(token: string) {
    return RefreshTokenModel
        .findOneAndUpdate({token, isRevoked: true})
        .lean();
}

export async function revokeAllUserTokens(
    userId: Types.ObjectId | string
) {
    const isValidId: boolean = mongoose.isValidObjectId(userId);
    if (isValidId) return null;
    return RefreshTokenModel
        .updateMany({userId}, {isRevoked: true}).lean();
}