import type {Response} from "express";
import {logoutService} from "@services/v1/index.js";
import type {AuthRequest} from "@src/types/index.js";

export async function logoutController(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await logoutService(refreshToken);
    return res.status(result.status).json(result.data);
}