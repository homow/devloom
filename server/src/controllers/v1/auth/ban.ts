import type {Response} from "express";
import type {BaseUserInput} from "@validators/user.js";
import {type AuthRequest, UserRole} from "@src/types/index.js";
import {banUserService} from "@services/v1/authServices/index.js";

export async function ban(
    req: AuthRequest<{}, {}, BaseUserInput>,
    res: Response
) {
    const {email, id} = req.body;
    const role = req.userPayload?.role as UserRole;
    const result = await banUserService({id, email, role});
    return res.status(result.status).json(result.data);
}