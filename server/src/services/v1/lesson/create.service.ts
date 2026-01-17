import {checkLessonExist} from "./index.js";
import LessonModel from "@models/Lesson.model.js";
import type {LessonInput} from "@validators/lesson.js";
import {checkCourseExist} from "@services/v1/course/common.js";
import type {SafeLessonDB, ServiceResponse} from "@src/types/index.js";

/** create lesson for a course */
export async function createService(
    id: string,
    data: LessonInput
): Promise<ServiceResponse> {
    /** check exist course */
    const existCourse = await checkCourseExist({id});

    /** return if not exist course */
    if (!existCourse) return {
        status: 404,
        data: {
            message: "not found course, please send a existing course",
            ok: false,
            code: "NOT_FOUND_COURSE",
        }
    };

    const {title, free, video, time} = data;

    /** check exist lesson with title */
    const lessonExist = await checkLessonExist({data: {title}});

    /** return if lesson exist */
    if ((lessonExist as SafeLessonDB[])[0]) return {
        status: 409,
        data: {
            ok: false,
            message: "lesson already exist",
            code: "LESSON_EXIST",
            lesson: (lessonExist as SafeLessonDB[])[0]
        }
    };

    /** create new lesson */
    const newLesson = await LessonModel.create({
        title,
        time,
        free,
        video,
        course: id,
    });

    /** get lesson with PipelineStage and join all reference */
    const lesson = await checkLessonExist({id: newLesson._id});

    /** return successfully response and new lesson */
    return {
        status: 201,
        data: {
            message: "lesson successfully created",
            ok: true,
            lesson: (lesson as SafeLessonDB[])[0],
        }
    };
}