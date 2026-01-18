import type {NextFunction, Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {checkBannedUser, checkIgnoredRoute, checkUserDB, type IgnoredRoutesKeys} from "@src/lib/index.js";

export function checkBanned(
    ignoreRoutes: IgnoredRoutesKeys[] = [],
    message?: string
) {
    return async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const isIgnored: boolean = checkIgnoredRoute({path: req.originalUrl, method: req.method, ignoreRoutes});

        if (isIgnored) {
            return next();
        }

        const id = req.userPayload?.id;
        const user = await checkUserDB({id});

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found",
                code: "USER_NOT_FOUND"
            });
        }

        const bannedUser = await checkBannedUser(user.email, message);
        if (bannedUser) return res.status(bannedUser.status).json(bannedUser.data);

        return next();
    };
}