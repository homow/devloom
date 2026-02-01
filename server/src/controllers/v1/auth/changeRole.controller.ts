import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {ChangeRoleInput} from "@validators/user.js";
import {changeRoleService} from "@services/v1/auth/index.js";

export async function changeRole(
    req: AuthRequest<
        { id: string },
        {},
        ChangeRoleInput
    >,
    res: Response
) {
    const result = await changeRoleService({
        newRole: req.body.role,
        userPayload: req.userPayload!,
        targetID: req.params.id
    });

    return res.status(result.status).json(result.data);
}