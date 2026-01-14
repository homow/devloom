import type {CourseInput} from "@validators/course.js";
import type {ServiceResponse} from "@src/types/index.js";
import {checkCourseExist} from "./common.js";

export async function createService(
    data: CourseInput,
): Promise<ServiceResponse> {
    const {
        title,
        description,
        category,
        discount,
        href,
        status,
        support,
        teacher,
        price,
        cover
    } = data;

    const courseExist = await checkCourseExist({title, href});

    if (courseExist) return {
        status: 409,
        data: {
            ok: false,
            message: "course already exists",
            code: "COURSE_EXIST",
        }
    };

}