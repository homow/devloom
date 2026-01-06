import {
    type AuthRequest,
    RolePriority,
    UserRole
} from "@src/types/index.js";
import type {NextFunction, Response} from "express";

export default function checkRole(roles: UserRole[]) {
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

        const userRole = req.userPayload.role as UserRole;  // ADMIN
        const userPriority = RolePriority[userRole]; // 2

        const allowedPriorities = roles.map(r =>
            RolePriority[r]
        );

        const isAllowed: boolean = allowedPriorities.some(p =>
            userPriority >= p
        );

        if (isAllowed) {
            return next();
        }

        return res.status(403).json({
            ok: false,
            message: "You are not authorized to access this route.",
            code: "ACCESS_DENIED"
        });
    };
};