import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {registerService} from "@services/v1/course/index.js";

export async function register(
    req: AuthRequest<{ id: string }>,
    res: Response
) {
    const {id} = req.params;
    const userPayload = req.userPayload!;
    const result = await registerService(userPayload, id);
    return res.status(result.status).json(result.data);
}