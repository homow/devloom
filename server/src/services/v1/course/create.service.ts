import {checkCourseExist} from "./index.js";
import {getSafeCourse} from "@src/lib/index.js";
import CourseModel from "@models/Course.model.js";
import type {CourseInput} from "@validators/course.js";
import type {CoursePopulate, ServiceResponse} from "@src/types/index.js";

/** check and created one course in db collection */
export async function createService(
    data: CourseInput & {
        cover: string,
    },
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
        cover,
    } = data;

    /** check course exist */
    const courseExist = await checkCourseExist({data: {title, href}});

    /** check if exist and return a response */
    if (courseExist) return {
        status: 409,
        data: {
            ok: false,
            message: "course already exists",
            code: "COURSE_EXIST",
            course: courseExist
        }
    };

    /** create new course with Model */
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
    })
        /** populated teacher form 'user' and 'category' collection */
        .then(c => c.populate("teacher"))
        .then(c => c.populate("category")) as CoursePopulate;

    /** return safe course data */
    return {
        status: 201,
        data: {
            ok: true,
            message: "Course successfully created",
            course: getSafeCourse(newCourse),
        }
    };
}