import type {CoursePopulate, ServiceResponse} from "@src/types/index.js";
import mongoose from "mongoose";
import CourseModel from "@models/Course.model.js";
import {getSafeCourse} from "@src/lib/index.js";

export async function deleteService(
    id: string
): Promise<ServiceResponse> {
    const isValidID: boolean = mongoose.isValidObjectId(id);

    if (!isValidID) return {
        status: 400,
        data: {
            ok: false,
            message: `Course id is invalid: ${id}`,
            code: "INVALID_COURSE_ID",
        }
    };

    const deleteCourse = await CourseModel.findByIdAndDelete(id).populate(["teacher", "category"]);

    if (!deleteCourse) return {
        status: 404,
        data: {
            ok: false,
            message: "course not found",
            code: "NOT_FOUND",
        }
    };

    const coursePopulate = deleteCourse as unknown as CoursePopulate;

    return {
        status: 200,
        data: {
            ok: true,
            message: `Course successfully deleted`,
            course: getSafeCourse(coursePopulate)
        }
    };
}