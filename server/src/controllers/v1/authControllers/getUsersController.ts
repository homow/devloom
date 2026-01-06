import type {Request, Response} from "express";
import {getUsersService} from "@services/v1/authServices/getUsersService.js";

export async function getUsersController(
    req: Request<{
        id?: string;
    }>,
    res: Response
) {
    const {id} = req.params;

    const result = await getUsersService(id);

    return res.status(result.status).json(result.data);
}