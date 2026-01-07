import {checkBannedUser, checkUserDB} from "@src/lib/index.js";
import type {NextFunction, Response} from "express";
import type {AuthRequest} from "@src/types/index.js";

export default function checkBanned(message?: string) {
    return async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const id = req.userPayload?.id;
        const user = await checkUserDB({id});

        const bannedUser = await checkBannedUser(
            user.email,
            message
        );

        if (bannedUser) return res.status(bannedUser.status).json(bannedUser.data);

        return next();
    };
}