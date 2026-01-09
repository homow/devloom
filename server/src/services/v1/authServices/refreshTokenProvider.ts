import {findRefreshToken} from "./index.js";
import type {ServiceResponse} from "@src/types/index.js";
import {hashSecretToken, verifyToken} from "@utils/crypto.js";

export async function refreshTokenProvider(
    token: string
): Promise<ServiceResponse> {
    if (!token) {
        return {
            status: 401,
            data: {
                ok: false,
                message: "refresh token is missing or expired",
                code: "REFRESH_TOKEN_NOT_FOUND",
            }
        };
    }

    try {
        const userPayload = verifyToken(token);
        const hashedOldToken: string = hashSecretToken(token);
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

        return {
            status: 200,
            data: {
                ok: true,
                message: "refresh token found",
                refreshTokenSession: session,
                userPayload
            }
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