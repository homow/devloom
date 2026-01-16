import {checkLessonExist} from "./index.js";
import LessonModel from "@models/Lesson.model.js";
import type {LessonInput} from "@validators/lesson.js";
import type {ServiceResponse} from "@src/types/index.js";
import {checkCourseExist} from "@services/v1/course/common.js";

export async function createService(
    id: string,
    data: LessonInput
): Promise<ServiceResponse> {
    const existCourse = await checkCourseExist({id});

    if (!existCourse) return {
        status: 404,
        data: {
            message: "not found course, please send a existing course",
            ok: false,
            code: "NOT_FOUND_COURSE",
        }
    };

    const {title, free, video, time} = data;

    const lessonExist = await checkLessonExist({data: {title}});

    if (lessonExist) return {
        status: 409,
        data: {
            ok: false,
            message: "lesson already exist",
            code: "LESSON_EXIST",
            lesson: lessonExist
        }
    };

    const newLesson = await LessonModel.create({
        title,
        time,
        free,
        video,
        course: id,
    });

    const lesson = await checkLessonExist({id: newLesson._id});

    return {
        status: 201,
        data: {
            message: "lesson successfully created",
            ok: true,
            lesson,
        }
    };
}