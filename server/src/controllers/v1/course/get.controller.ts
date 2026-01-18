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
        course: undefined
    };

    if (req.params.courseHref) {
        response.message = "course successfully found.";
        response.course = courses;
    } else {
        response.message = "all courses successfully found.";
        response.courses = courses;
    }

    return res.status(200).json(response);
}