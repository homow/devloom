import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";
import {createService} from "@services/v1/categoryServices/index.js";

export async function create(
    req: AuthRequest<{}, {}, CategoryInput>,
    res: Response
) {
    const {title, href} = req.body;
    const result = await createService({href, title});
    return res.status(result.status).send(result.data);
}