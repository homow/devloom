import {findRefreshTokens} from "./index.js";
import {compareSecret, verifyToken} from "@utils/crypto.js";
import type {RefreshToken, ServiceResponse} from "@src/types/index.js";
import RefreshTokenModel from "@models/RefreshToken.model.js";
import {createTokenAndOptions} from "@utils/tokens.js";

export async function refreshService(
    oldToken: string
): Promise<ServiceResponse> {
    if (!oldToken) {
        return {
            status: 401,
            data: {
                ok: false,
                message: "Refresh token is missing or expired",
                code: "REFRESH_TOKEN_NOT_FOUND",
            }
        };
    }

    try {
        const userPayload = verifyToken(oldToken);

        const allSessions = await findRefreshTokens(userPayload.id);

        let findSession: null | RefreshToken = null;

        for (const session of allSessions) {
            const isValidToken: boolean = await compareSecret(oldToken, session.token);

            if (isValidToken) findSession = session;
        }

        if (!findSession || findSession.isRevoked) {
            return {
                status: 401,
                data: {
                    ok: false,
                    message: "Invalid or expired refresh token",
                    code: "REFRESH_TOKEN_INVALID",
                }
            };
        }

        await RefreshTokenModel.updateOne({_id: findSession._id}, {$set: {isRevoked: true}});

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

        return {
            status: 200,
            data: {
                ok: true,
                message: "success",
                accessToken: accessToken.token,
            },
            refreshToken,
        };

    } catch (e) {
        return {
            status: 401,
            data: {
                ok: false,
                message: (e as Error).message || "refresh token is invalid or expired",
                code: "INVALID_REFRESH_TOKEN",
            }
        };
    }
}