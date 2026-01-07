import {checkBannedUser} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

export default function checkBannedInBody(message?: string) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const bannedUser = await checkBannedUser(
            req.body.email,
            message
        );

        if (bannedUser) return res.status(bannedUser.status).json(bannedUser.data);

        return next();
    };
}