import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {logoutService} from "@services/v1/authServices/index.js";

export async function logout(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await logoutService(refreshToken);
    return res.status(result.status).json(result.data);
}