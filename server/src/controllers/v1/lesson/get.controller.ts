import type {Request, Response} from "express";
import {checkLessonExist} from "@services/v1/lesson/index.js";
import {checkCourseExist} from "@services/v1/course/common.js";
import type {LessonDB, ServiceResponse} from "@src/types/index.js";

/** get one lesson with id and get all lesson from one course */
export async function get(
    req: Request<{ courseHref: string; lessonID?: string }>,
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
        /** get one lesson from aggregate PipelineStage[] */
        const lesson = await checkLessonExist({id: lessonID});

        /** if not exist lesson */
        if (!lesson || lesson.length === 0) return res.status(404).json({
            ok: false,
            message: "lesson not found",
            code: "NOT_EXIST_LESSON",
        });

        /** if invalid id */
        if ((lesson as ServiceResponse).status === 400) return res.status((lesson as ServiceResponse).status).json((lesson as ServiceResponse).data);

        /** find and return lesson */
        return res.status(200).json({
            ok: true,
            message: "lesson successfully found",
            lesson: (lesson as LessonDB[])[0],
        });
    }

    /** get all lessons from one course */
    const lessons = await checkLessonExist({data: {course: existCourse.id}});

    /** if not exist lessons */
    if (!lessons || lessons.length === 0) return res.status(404).json({
        ok: false,
        message: "lessons not found",
        code: "NOT_EXIST_LESSONS",
    });

    return res.status(200).json({
        ok: true,
        message: "lessons successfully found",
        lessons,
    });
}