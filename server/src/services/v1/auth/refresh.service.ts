import {checkUserDB} from "@src/lib/index.js";
import {createTokenAndOptions} from "@utils/tokens.js";
import type {AuthPayload, ServiceResponse} from "@src/types/index.js";
import {refreshTokenProvider} from "@services/v1/auth/refreshTokenProvider.js";

export async function refreshService(
    oldToken: string
): Promise<ServiceResponse> {
    const checkRefreshToken = await refreshTokenProvider(oldToken);
    if (checkRefreshToken.status !== 200) return checkRefreshToken;

    const userPayload = checkRefreshToken.data.userPayload as AuthPayload;

    const accessToken = createTokenAndOptions({
        payload: {
            id: userPayload.id,
            role: userPayload.role,
        },
        tokenType: "access"
    });

    const user = await checkUserDB({id: userPayload.id});

    return {
        status: 200,
        data: {
            ok: true,
            message: "success",
            accessToken: accessToken.token,
            user
        },
    };
}