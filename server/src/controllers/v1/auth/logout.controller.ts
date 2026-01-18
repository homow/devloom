import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {logoutService} from "@services/v1/auth/index.js";

export async function logout(
    req: AuthRequest,
    res: Response
) {
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;
    const result = await logoutService(refreshToken);

    if (result.status === 200) res.clearCookie("refreshToken", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
    });

    return res.status(result.status).json(result.data);
}