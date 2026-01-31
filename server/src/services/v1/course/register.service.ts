import CourseUserModel from "@models/course-user.model.js";
import {checkCourseExist} from "@services/v1/course/get.service.js";
import type {AuthPayload, CoursePopulate, CustomError, ServiceResponse} from "@src/types/index.js";

export async function registerService(
    userPayload: AuthPayload,
    courseID: string,
): Promise<ServiceResponse> {
    try {
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
            course: courseID,
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
                    id: courseUserRegister.id.toString(),
                    createdAt: courseUserRegister.createdAt.toISOString(),
                    updatedAt: courseUserRegister.updatedAt.toISOString(),
                },
            }
        };
    } catch (e) {
        const customError = e as CustomError;

        if (customError?.errorResponse?.code != undefined && customError?.errorResponse?.code === 11000) return {
            status: 409,
            data: {
                ok: false,
                message: "user already registered in this course",
                code: "CONFLICT",
            }
        };

        return {
            status: customError.errorResponse.code || 500,
            data: {
                ok: false,
                message: customError.message || "Something went wrong",
                code: "UNKNOWN_ERROR",
            }
        };
    }
}