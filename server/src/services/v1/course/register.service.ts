import CourseUserModel from "@models/course-user.model.js";
import {checkCourseExist} from "@services/v1/course/get.service.js";
import type {AuthPayload, CoursePopulate, ServiceResponse} from "@src/types/index.js";

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

    const courseUserRegister = await CourseUserModel.create({
        course: course._id,
        user: userPayload.id,
        price: course.price,
    });

    return {
        status: 201,
        data: {
            ok: true,
            message: "Course Register Success",
            user: {
                id: userPayload.id,
                role: userPayload.role
            },
            course,
            registerData: {
                id: courseUserRegister.id,
                user: userPayload.user.toString(),
                course: courseUserRegister.course.toString(),
                createdAt: courseUserRegister.createdAt.toISOString(),
                updatedAt: courseUserRegister.updatedAt.toISOString(),
            },
        }
    };
}