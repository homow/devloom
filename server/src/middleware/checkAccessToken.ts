import {verifyToken} from "@utils/crypto.js";
import type {AuthRequest} from "@src/types/index.js";
import type {NextFunction, Response} from "express";

export default function checkAccessToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.accessToken
        || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({
        ok: false,
        message: 'Access token is required',
        code: "ACCESS_TOKEN_MISSING",
    });

    try {
        req.userPayload = verifyToken(token);
        return next();
    } catch (e) {
        return res.status(401).json({
            ok: false,
            message: (e as Error).message
                || "Access token is invalid or expired",
            code: "INVALID_ACCESS_TOKEN",
        });
    }
};