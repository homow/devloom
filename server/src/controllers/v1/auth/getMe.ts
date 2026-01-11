import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import {getMeService} from "@services/v1/authServices/index.js";

export async function getMe(
    req: AuthRequest,
    res: Response
) {
    const userPayload = req.userPayload;

    if (!userPayload) {
        return res.status(401).json({
            status: 401,
            data: {
                ok: false,
                message: "Unauthorized. access token missing",
                code: "UNAUTHORIZED",
            }
        });
    }

    const result = await getMeService(userPayload);
    return res.status(result.status).json(result.data);
}