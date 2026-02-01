import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {refreshService} from "@services/v1/auth/index.js";

export async function refresh(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await refreshService(refreshToken);
    return res.status(result.status).json(result.data);
}