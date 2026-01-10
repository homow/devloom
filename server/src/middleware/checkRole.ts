import type {NextFunction, Response} from "express";
import {type AuthRequest, UserRole} from "@src/types/index.js";
import {type Comparison, isAllowedToAction} from "@utils/auth.js";

interface Params {
    requiredRole: UserRole;
    comparison?: Comparison;
    message?: string;
}

export default function checkRole(
    {
        requiredRole,
        comparison = "equal",
        message
    }: Params
) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.userPayload) {
            return res.status(401).json({
                ok: false,
                code: "UNAUTHORIZED",
                message: "Authentication required",
            });
        }

        const userRole = req.userPayload.role as UserRole;

        const isAllowed: boolean = isAllowedToAction({
            actionRole: userRole,
            targetRole: requiredRole,
            roleComparison: comparison
        });

        if (!isAllowed) {
            return res.status(403).json({
                ok: false,
                code: "ACCESS_DENIED",
                message: message || `Your role (${userRole}) is not allowed to access a route requiring ${requiredRole} (${comparison}).`,
            });
        }

        return next();
    };
};