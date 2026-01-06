import type {NextFunction, Response} from "express";
import {type AuthRequest, UserRole} from "@src/types/index.js";

export default function isAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.userPayload) {
        return res.status(401).json({
            ok: false,
            code: "UNAUTHORIZED",
            message: "Authentication required",
        });
    }

    if (req.userPayload?.role === UserRole.ADMIN) {
        return next();
    }

    return res.status(403).json({
        ok: false,
        message: "You are not authorized to access this route.",
        code: "ACCESS_DENIED"
    });
}