import type {Request, Response} from "express";
import type {ServiceResponse} from "@src/types/index.js";
import {getService} from "@services/v1/category/index.js";
import {getCoursesByCategoryService} from "@services/v1/category/index.js";

export async function get(
    req: Request<{ href?: string }>,
    res: Response
) {
    const href: string | undefined = req.params?.href;

    const result: ServiceResponse = {
        status: 404,
        data: {
            ok: false,
            message: ""
        }
    };

    if (href) {
        const courses = await getCoursesByCategoryService(href);
        result.data = courses.data;
        result.status = courses.status;
    } else {
        const course = await getService();
        result.status = course.status;
        result.data = course.data;
    }


    return res.status(result.status).json(result.data);
}