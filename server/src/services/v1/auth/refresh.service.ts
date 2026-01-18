import {checkUserDB} from "@src/lib/index.js";
import {updateRefreshToken} from "./index.js";
import {createTokenAndOptions} from "@utils/tokens.js";
import {refreshTokenProvider} from "@services/v1/auth/refreshTokenProvider.js";
import type {AuthPayload, RefreshToken, ServiceResponse} from "@src/types/index.js";

export async function refreshService(
    oldToken: string
): Promise<ServiceResponse> {
    const checkRefreshToken = await refreshTokenProvider(oldToken);
    if (checkRefreshToken.status !== 200) return checkRefreshToken;

    const session = checkRefreshToken.refreshTokenSession as RefreshToken;
    const userPayload = checkRefreshToken.payload as AuthPayload;

    await updateRefreshToken(session._id);

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