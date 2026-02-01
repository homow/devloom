import type {Request, Response} from "express";
import {getCoursesByCategoryService} from "@services/v1/category/index.js";

export async function get(
    req: Request<{ href: string }>,
    res: Response
) {
    const href: string = req.params?.href;
    const result = await getCoursesByCategoryService(href);
    return res.status(result.status).json(result.data);
}