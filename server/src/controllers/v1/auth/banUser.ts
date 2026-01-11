import type {Response} from "express";
import {banUserService} from "@services/v1/index.js";
import type {BaseUserInput} from "@validators/user.js";
import {type AuthRequest, UserRole} from "@src/types/index.js";

export async function banUser(
    req: AuthRequest<{}, {}, BaseUserInput>,
    res: Response
) {
    const {email, id} = req.body;
    const role = req.userPayload?.role as UserRole;
    const result = await banUserService({id, email, role});
    return res.status(result.status).json(result.data);
}