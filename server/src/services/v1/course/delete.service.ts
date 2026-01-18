import CourseModel from "@models/Course.model.js";
import {getSafeCourse} from "@src/lib/index.js";
import type {CoursePopulate, ServiceResponse} from "@src/types/index.js";

export async function deleteService(
    id: string
): Promise<ServiceResponse> {
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