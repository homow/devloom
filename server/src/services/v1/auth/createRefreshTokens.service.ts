import mongoose, {Types} from "mongoose";
import {hashSecretToken} from "@utils/crypto.js";
import type {ServiceResponse} from "@src/types/index.js";
import RefreshTokenModel from "@models/RefreshToken.model.js";

export async function createRefreshTokensService(
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
    const hashedToken: string = hashSecretToken(token);

    const newRefreshTokenModel = await RefreshTokenModel.create({
        user: userId,
        token: hashedToken,
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

export async function findRefreshToken(token: string, id: string) {
    return RefreshTokenModel.findOne({user: id, token, isRevoked: false}).lean();
}

export async function updateRefreshToken(id: string) {
    return RefreshTokenModel.findOneAndUpdate(
        {_id: id, isRevoked: false},
        {isRevoked: true},
        {new: true}
    ).lean();
}

export async function revokeAllUserTokens(
    userId: Types.ObjectId | string
) {
    const isValidId: boolean = mongoose.isValidObjectId(userId);
    if (!isValidId) return null;
    return RefreshTokenModel.updateMany({user: userId}, {isRevoked: true}).lean();
}