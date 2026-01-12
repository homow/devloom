import type {Request, Response} from "express";
import {getAllService} from "@services/v1/categoryServices/index.js";

export async function getAll(
    _req: Request,
    res: Response
) {
    const result = await getAllService();
    return res.status(result.status).json(result.data);
}