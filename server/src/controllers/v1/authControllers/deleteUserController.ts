import type {Response} from "express";
import type {BaseUserInput} from "@validators/user.js";
import {deleteUserService} from "@services/v1/index.js";
import {type AuthRequest, UserRole} from "@src/types/index.js";

export async function deleteUserController(
    req: AuthRequest<{}, {}, BaseUserInput>,
    res: Response
) {
    const role = req.userPayload?.role as UserRole;
    const {email, id} = req.body;
    const result = await deleteUserService({id, email, role});
    return res.status(result.status).json(result.data);
}