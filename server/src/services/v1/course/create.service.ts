import {checkCourseExist} from "./common.js";
import CourseModel from "@models/Course.model.js";
import type {CourseInput} from "@validators/course.js";
import type {ServiceResponse} from "@src/types/index.js";

export async function createService(
    data: CourseInput,
): Promise<ServiceResponse> {
    const {
        title,
        href,
        category,
        description,
        discount,
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
            course: courseExist
        }
    };

    const newCourse = await CourseModel.create({
        title,
        href,
        category,
        description,
        discount,
        status,
        support,
        teacher,
        price,
        cover
    });

    if (newCourse) {
        const course = await newCourse.populate("teacher").then(c => c.populate("category"));

        return {
            status: 201,
            data: {
                ok: true,
                message: "Course successfully created",
                course,
            }
        };
    }

    return {
        status: 500,
        data: {
            ok: false,
            message: "Internal Server Error",
            code: "INTERNAL_SERVER_ERROR",
        }
    };
}