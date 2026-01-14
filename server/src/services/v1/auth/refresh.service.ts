import {checkUserDB, generateTokenTime} from "@src/lib/index.js";
import {createTokenAndOptions} from "@utils/tokens.js";
import {createRefreshTokensService, updateRefreshToken} from "./index.js";
import type {AuthPayload, RefreshToken, ServiceResponse} from "@src/types/index.js";
import {refreshTokenProvider} from "@services/v1/auth/refreshTokenProvider.js";

export async function refreshService(
    oldToken: string
): Promise<ServiceResponse> {
    const checkRefreshToken = await refreshTokenProvider(oldToken);
    if (checkRefreshToken.status !== 200) return checkRefreshToken;

    const session = checkRefreshToken.refreshTokenSession as RefreshToken;
    const userPayload = checkRefreshToken.payload as AuthPayload;

    await updateRefreshToken(session._id);

    const refreshToken = createTokenAndOptions({
        payload: {
            id: userPayload.id,
            role: userPayload.role,
            remember: userPayload.remember,
        },
        tokenType: "refresh",
        remember: userPayload.remember,
    });
    const accessToken = createTokenAndOptions({
        payload: {
            id: userPayload.id,
            role: userPayload.role,
        },
        tokenType: "access"
    });

    const expiresAt: Date = generateTokenTime(userPayload.remember);

    await createRefreshTokensService(userPayload.id, refreshToken.token, expiresAt);

    const user = await checkUserDB({id: userPayload.id});

    return {
        status: 200,
        data: {
            ok: true,
            message: "success",
            accessToken: accessToken.token,
            user
        },
        refreshToken,
    };
}