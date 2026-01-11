import type {Request, Response} from "express";
import type {BaseUserInput} from "@validators/user.js";
import {getUsersService} from "@services/v1/authServices/getUsersService.js";

export async function getUsers(
    req: Request<{}, {}, BaseUserInput>,
    res: Response
) {
    const id = req?.body?.id;
    const email = req?.body?.email;
    const result = await getUsersService(id, email);
    return res.status(result.status).json(result.data);
}