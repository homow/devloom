import mongoose, {Types} from "mongoose";
import type {ServiceResponse} from "@src/types/index.js";
import RefreshTokenModel from "@models/RefreshToken.model.js";

export async function createRefreshTokenService(
    userId: Types.ObjectId | string,
    token: string,
    expiresAt: Date,
): Promise<ServiceResponse> {
    const isValidId: boolean = mongoose.isValidObjectId(userId);

    if (!isValidId) return {
        status: 400,
        data: {
            ok: false,
            message: "Invalid id"
        }
    };

    const newRefreshTokenModel = await RefreshTokenModel.create({
        user: userId,
        token,
        expiresAt,
    });

    return {
        status: 201,
        data: {
            ok: true,
            message: "Successfully created refresh token model",
            refreshTokenModel: newRefreshTokenModel
        }
    };
}

export async function findRefreshTokens(id: string) {
    return RefreshTokenModel.find({user: id}).lean();
}

export async function updateRefreshToken(token: string) {
    return RefreshTokenModel.findOneAndUpdate({token, isRevoked: true}).lean();
}

export async function revokeAllUserTokens(
    userId: Types.ObjectId | string
) {
    const isValidId: boolean = mongoose.isValidObjectId(userId);
    if (!isValidId) return null;
    return RefreshTokenModel.updateMany({user: userId}, {isRevoked: true}).lean();
}