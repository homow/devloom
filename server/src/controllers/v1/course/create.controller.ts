import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CourseInput} from "@validators/course.js";
import {createService} from "@services/v1/course/index.js";

export async function create(
    req: AuthRequest<{}, {}, CourseInput>,
    res: Response
) {
    const result = await createService(req.body);

    return res.status(200).json({
        status: "success",
        data: {
            message: req.userPayload,
        }
    });
}