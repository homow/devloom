import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";

export async function refreshController(
    req: AuthRequest,
    res: Response
) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken || req.signedCookies.refreshToken;

    return res.status(200).json({
        access_token: req.cookies,
        refresh_token: req.signedCookies,
    });
}