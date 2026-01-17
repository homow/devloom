import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {logoutService} from "@services/v1/auth/index.js";

export async function logout(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await logoutService(refreshToken);

    if (result.status === 200) {
        res.cookie("refreshToken", "", {
            maxAge: 0
        });
    }

    return res.status(result.status).json(result.data);
}