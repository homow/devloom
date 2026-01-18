import {findRefreshToken} from "./index.js";
import type {ServiceResponse} from "@src/types/index.js";
import {hashSecretToken, verifyToken} from "@utils/crypto.js";

/** find and check token */
export async function refreshTokenProvider(
    token: string
): Promise<ServiceResponse> {
    /** if token not exist */
    if (!token) return {
        status: 401,
        data: {
            ok: false,
            message: "refresh token is missing or expired",
            code: "REFRESH_TOKEN_NOT_FOUND",
        }
    };

    try {
        /** check token */
        const userPayload = verifyToken(token);

        /** hash old token for compare */
        const hashedOldToken: string = hashSecretToken(token);

        /** find token with hashed */
        const session = await findRefreshToken(hashedOldToken, userPayload.id);

        /** if token not found or expired */
        if (!session || session.isRevoked) return {
            status: 401,
            data: {
                ok: false,
                message: "Invalid or expired refresh token",
                code: "REFRESH_TOKEN_INVALID",
            }
        };

        /** if token found and is valid */
        return {
            status: 200,
            data: {
                ok: true,
                message: "refresh token found",
                userPayload
            },
            refreshTokenSession: session,
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