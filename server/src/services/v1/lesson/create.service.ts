import type {LessonInput} from "@validators/lesson.js";
import type {ServiceResponse} from "@src/types/index.js";
import {checkCourseExist} from "@services/v1/course/common.js";

export async function createService(
    id,
    body: LessonInput
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


}