import type {Request, Response} from "express";
import {getAllService} from "@services/v1/categoryServices/index.js";

export async function getAll(
    req: Request,
    res: Response
) {
    const result = await getAllService();
    return res.status(result.status).json(result.data);
}