import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CourseInput} from "@validators/course.js";

export async function create(
    req: AuthRequest<{}, {}, CourseInput>,
    res: Response
) {
    const {
        title,
        description,
        category,
        discount,
        href,
        status,
        support,
        teacher,
        price,
        cover
    } = req.body;

    const data: CourseInput = {
        title,
        description,
        category,
        discount,
        href,
        status,
        support,
        teacher,
        price,
        cover
    };

    return res.status(200).json({
        status: "success",
        data: {
            message: req.userPayload,
        }
    });
}