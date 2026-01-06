import type {Request, Response} from "express";
import type {DeleteUserInput} from "@validators/user.js";
import {deleteUserService} from "@services/v1/index.js";

export async function deleteUserController(
    req: Request<{}, {}, DeleteUserInput>,
    res: Response
) {
    const {email, id} = req.body;
    const result = await deleteUserService(id, email);
    return res.status(result.status).json(result.data);
}