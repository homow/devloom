import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {deleteService} from "@services/v1/category/index.js";

export async function deleteCategory(
    req: AuthRequest<{ id: string }>,
    res: Response
) {
    const result = await deleteService(req.params.id);
    return res.status(result.status).json(result.data);
}