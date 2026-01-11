import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {UpdateUserInput} from "@validators/user.js";
import {updateUserService} from "@services/v1/authServices/index.js";

export async function updateUser(
    req: AuthRequest<{}, {}, UpdateUserInput>,
    res: Response
) {
    const id = req.userPayload?.id;
    const {name, password} = req.body;

    const result = await updateUserService({name, password}, id);

    return res.status(result.status).json(result.data);
}