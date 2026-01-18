import type {Request, Response} from "express";
import {checkCourseExist} from "@services/v1/course/index.js";

export async function get(
    req: Request,
    res: Response
) {
    const courses = await checkCourseExist();
    console.log(courses);
    return res.status(200).json(courses);
}