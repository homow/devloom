import mongoose from "mongoose";
import type {Request, Response} from "express";
import {checkCourseExist} from "@services/v1/course/common.js";
import {checkLessonExist, getServices} from "@services/v1/lesson/index.js";

/** get one lesson with id and get all lesson from one course */
export async function get(
    req: Request<{ courseHref: string, lessonID?: string }>,
    res: Response
) {
    const courseHref: string = req.params.courseHref;
    const lessonID: string | undefined = req.params.lessonID;

    /** check course on db collection */
    const existCourse = await checkCourseExist({data: {href: courseHref}});

    if (!existCourse) return res.status(404).json({
        ok: false,
        message: "Course not found",
        code: "NOT_EXIST_COURSE",
    });

    /** if it has lesson id */
    if (lessonID) {
        const isValidLessonID: boolean = mongoose.isValidObjectId(lessonID);

        if (!isValidLessonID) return res.status(400).json({
            ok: false,
            message: "invalid lesson id",
            code: "INVALID_ID",

        });

        const lesson = await checkLessonExist({id: lessonID});

        if (!lesson) return res.status(404).json({
            ok: false,
            message: "lesson not found",
            code: "NOT_EXIST_LESSON",
        });

        res.status(200).json({
            ok: true,
            lesson,
            message: "lesson successfully found",
        });
    }

    const getLessons = await getServices(existCourse.id);
    return res.status(getLessons.status).json(getLessons.data);
}