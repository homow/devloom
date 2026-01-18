import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {deleteService} from "@services/v1/lesson/index.js";

/** delete on lesson */
export async function deleteController(
    req: AuthRequest<{ id: string }>,
    res: Response
) {
    const {id} = req.params;
    const result = await deleteService(id);
    res.status(result.status).json(result.data);
}