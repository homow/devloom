import RefreshTokenModel from "@models/RefreshToken.model.js";
import type {RefreshToken, ServiceResponse} from "@src/types/index.js";
import {refreshTokenProvider} from "@services/v1/authServices/refreshTokenProvider.js";

export async function logoutService(
    token: string
): Promise<ServiceResponse> {
    const checkRefreshToken = await refreshTokenProvider(token);
    if (checkRefreshToken.status !== 200) return checkRefreshToken;

    const session = checkRefreshToken.refreshTokenSession as RefreshToken;

    await RefreshTokenModel.findByIdAndUpdate(session._id, {$set: {isRevoked: true}});

    return {
        status: 200,
        data: {
            ok: true,
            message: "Logged out successfully",
        }
    };
}