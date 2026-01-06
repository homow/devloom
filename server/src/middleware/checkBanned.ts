import {checkBannedUser} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

export default async function checkBanned(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const bannedUser = await checkBannedUser(
        req.body.email
    );

    if (bannedUser) return res
        .status(bannedUser.status)
        .json(bannedUser.data);

    return next();
}