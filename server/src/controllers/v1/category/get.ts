import type {Request, Response} from "express";
import {getService} from "@services/v1/category/index.js";

export async function get(
    req: Request<{ id?: string }>,
    res: Response
) {
    const result = await getService(req.params.id);
    return res.status(result.status).json(result.data);
}