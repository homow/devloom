import type {Request, Response} from "express";
import {checkCourseExist} from "@services/v1/course/index.js";

export async function get(
    req: Request,
    res: Response
) {
    const courses = await checkCourseExist();
    return res.status(200).json({
        ok: true,
        message: "courses successfully found.",
        courses
    });
}