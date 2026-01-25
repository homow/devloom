import type {Request, Response} from "express";
import {checkCourseExist} from "@services/v1/course/index.js";

/** get all or one course from services and return to client */
export async function get(
    req: Request<{ courseHref?: string }>,
    res: Response
) {
    const courses = await checkCourseExist({data: {href: req.params.courseHref}});

    const response = {
        ok: true,
        message: "",
        courses: undefined,
        course: undefined,
        code: undefined,
    };

    let status: number = 200;

    if (req.params.courseHref) {
        response.ok = !!courses;
        response.message = courses ? "course successfully found." : "course not found.";
        response.course = courses ?? undefined;
        (response.code as string | undefined) = courses ? undefined : "COURSE_NOT_FOUND";
        status = 404;
    } else {
        response.message = "all courses successfully found.";
        response.courses = courses ?? [];
    }

    return res.status(status).json(response);
}