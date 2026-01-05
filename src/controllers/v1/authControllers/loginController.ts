import type {Request, Response} from "express";
import {loginService} from "@services/v1/index.js";
import type {InputUser} from "@validators/user.js";

export type InputUserLogin = Omit<InputUser, "name">;

export async function loginController(
    req: Request<{}, {}, InputUserLogin>,
    res: Response
) {
    console.log(req.headers.cookie);
    const result = await loginService(req.body);
    return res.status(result.status).send(result.data);
}