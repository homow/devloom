import type {Request, Response} from "express";
import mongoose from "mongoose";
import {checkLessonExist} from "@services/v1/lesson/index.js";

export async function get(
    req: Request<{ courseID?: string, lessonID?: string }>,
    res: Response
) {
    const courseID = req.params.courseID;
    const lessonID = req.params.lessonID;

    if (courseID && lessonID) {
        const isValidCourseID: boolean = mongoose.isValidObjectId(courseID);
        const isValidLessonID: boolean = mongoose.isValidObjectId(lesson);

        if (!isValidLessonID || !isValidCourseID) return res.status(400).json({
            ok: false,
            message: "invalid ID",
            code: "INVALID_ID",
            errors: [
                !isValidCourseID ? "invalid course id" : undefined,
                !isValidLessonID ? "invalid lesson id" : undefined,
            ]
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