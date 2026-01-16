import type {Request, Response} from "express";
import mongoose from "mongoose";
import {checkLessonExist} from "@services/v1/lesson/index.js";
import {checkCourseExist} from "@services/v1/course/common.js";

export async function get(
    req: Request<{ course?: string, lessonID?: string }>,
    res: Response
) {
    const courseTitle: string | undefined = req.params.course;
    const lessonID: string | undefined = req.params.lessonID;

    if (lessonID && courseTitle) {
        const existCourse = await checkCourseExist({data: {title: courseTitle}});

        if (!existCourse) {
            return res.status(404).json({
                ok: false,
                message: "Course not found",
                code: "NOT_EXIST_COURSE",
            });
        }

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
}