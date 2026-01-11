import type {AuthRequest} from "@src/types/index.js";
import type {Response} from "express";

export async function create(
    req: AuthRequest,
    res: Response
) {
    console.log(req.userPayload);
    return res.status(200).json({
        status: "success",
        message: "Successfully created"
    });
}