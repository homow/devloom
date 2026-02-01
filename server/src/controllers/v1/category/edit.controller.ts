import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {EditCategoryInput} from "@validators/category.js";
import {editService} from "@services/v1/category/index.js";

export async function edit(
    req: AuthRequest<{ id: string }, {}, EditCategoryInput>,
    res: Response
) {
    const {id} = req.params;
    const {title, href} = req.body;
    const result = await editService(id, {title, href});
    return res.status(result.status).json(result.data);
}