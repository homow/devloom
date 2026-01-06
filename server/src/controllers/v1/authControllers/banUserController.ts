import type {Request, Response} from "express";
import type {BanUserInput} from "@validators/user.js";
import {banUserService} from "@services/v1/index.js";

export async function banUserController(
    req: Request<{}, {}, BanUserInput>,
    res: Response
) {
    const result = await banUserService(req.body.email);
    return res.status(result.status).json(result.data);
}