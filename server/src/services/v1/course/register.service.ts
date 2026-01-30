import {checkCourseExist} from "@services/v1/course/get.service.js";
import type {AuthPayload ,CoursePopulate, ServiceResponse} from "@src/types/index.js";

export async function registerService(
    userPayload: AuthPayload,
    courseID: string,
): Promise<ServiceResponse> {
    const courseExist = await checkCourseExist({id: courseID});

    if (!courseExist) return {
        status: 404,
        data: {
            ok: false,
            message: "Course not exists",
            code: "NOT_FOUND",
        }
    };

    const course = courseExist as CoursePopulate;

}