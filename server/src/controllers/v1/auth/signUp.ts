import type {Request, Response} from "express";
import type {InputUser} from "@validators/user.js";
import {signupService} from "@services/v1/auth/index.js";

export async function signUp(
    req: Request<{}, {}, InputUser>,
    res: Response
) {
    const result = await signupService(req.body);
    return res.status(result.status).json(result.data);
}