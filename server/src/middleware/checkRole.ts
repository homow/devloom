import type {NextFunction, Response} from "express";
import {type AuthRequest, UserRole} from "@src/types/index.js";
import {type Comparison, isAllowedToAction} from "@utils/auth.js";

interface CheckRoleParams {
    requiredRole: UserRole;
    comparison?: Comparison;
    message?: string;
}

export function checkRole(
    {
        requiredRole,
        comparison = "equal",
        message,
    }: CheckRoleParams
) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const userPayload = req.userPayload;

        if (!userPayload) {
            return res.status(401).json({
                ok: false,
                code: "UNAUTHORIZED",
                message: "Authentication required",
            });
        }

        const userRole: UserRole = userPayload.role;

        const isAllowed: boolean = isAllowedToAction({
            actionRole: userRole,
            targetRole: requiredRole,
            roleComparison: comparison
        });

        if (!isAllowed) {
            return res.status(403).json({
                ok: false,
                code: "ACCESS_DENIED",
                message: message || `Your role (${userRole}) is not allowed to access a route requiring ${requiredRole} (${comparison === "equal" ? "equal or higher" : comparison}).`,
            });
        }

        return next();
    };
}