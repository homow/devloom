import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {refreshService} from "@services/v1/index.js";
import {createTokenAndOptions} from "@utils/tokens.js";

export async function refreshController(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await refreshService(refreshToken);

    if (result.data.ok) {
        const refreshToken = result.refreshToken as ReturnType<typeof createTokenAndOptions>;
        res.cookie("refreshToken", refreshToken.token, refreshToken.options);
    }

    return res.status(result.status).json(result.data);
}