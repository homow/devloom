import {checkUserDB} from "@src/lib/index.js";
import {createTokenAndOptions} from "@utils/tokens.js";
import type {ServiceResponse} from "@src/types/index.js";
import {hashSecretToken, verifyToken} from "@utils/crypto.js";
import {createRefreshTokenService, findRefreshToken, updateRefreshToken} from "./index.js";

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
        const hashedOldToken: string = hashSecretToken(oldToken);
        const session = await findRefreshToken(hashedOldToken, userPayload.id);

        if (!session || session.isRevoked) {
            return {
                status: 401,
                data: {
                    ok: false,
                    message: "Invalid or expired refresh token",
                    code: "REFRESH_TOKEN_INVALID",
                }
            };
        }

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

        const expiresAt: Date = userPayload.remember
            ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
            : new Date(Date.now() + 24 * 60 * 60 * 1000);    // 1d

        await createRefreshTokenService(userPayload.id, refreshToken.token, expiresAt);

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