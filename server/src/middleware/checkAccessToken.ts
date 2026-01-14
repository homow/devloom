import {verifyToken} from "@utils/crypto.js";
import type {NextFunction, Response} from "express";
import type {AuthPayload, AuthRequest} from "@src/types/index.js";
import {checkIgnoredRoute, type IgnoredRoutesKeys} from "@utils/index.js";

export function checkAccessToken(
    ignoreRoutes: IgnoredRoutesKeys[]
) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const isIgnored: boolean = checkIgnoredRoute({method: req.method, path: req.originalUrl, ignoreRoutes});

        if (isIgnored) {
            return next();
        }

        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({
            ok: false,
            message: 'Access token is required',
            code: "ACCESS_TOKEN_MISSING",
        });

        try {
            req.userPayload = verifyToken(token) as AuthPayload;
            return next();
        } catch (e) {
            return res.status(401).json({
                ok: false,
                message: (e as Error).message || "Access token is invalid or expired",
                code: "INVALID_ACCESS_TOKEN",
            });
        }
    };
}