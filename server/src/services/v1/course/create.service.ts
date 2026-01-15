import {checkCourseExist} from "./common.js";
import {getSafeCourse} from "@src/lib/index.js";
import CourseModel from "@models/Course.model.js";
import type {CourseInput} from "@validators/course.js";
import type {CoursePopulate, ServiceResponse} from "@src/types/index.js";

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
    const courseExist = await checkCourseExist({title, href});

    // check if exist and return a response
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
    })
        // populated teacher form user and category collection
        .then(c => c.populate("teacher"))
        .then(c => c.populate("category")) as CoursePopulate;

    console.log(newCourse);

    return {
        status: 201,
        data: {
            ok: true,
            message: "Course successfully created",
            course: getSafeCourse(newCourse), // return safe course data
        }
    };
}