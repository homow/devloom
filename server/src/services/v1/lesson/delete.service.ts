import LessonModel from "@models/Lesson.model.js";
import type {ServiceResponse} from "@src/types/index.js";

/** find and delete on lesson */
export async function deleteService(
    id: string
): Promise<ServiceResponse> {
    const lessonDeleted = await LessonModel.findByIdAndDelete(id);

    /** if lesson not found */
    if (!lessonDeleted) return {
        status: 404,
        data: {
             ok: false,
            message: "lesson not found",
            code: "NOT_FOUND",
        }
    };

    return {
        status: 200,
        data: {
            ok: true,
            message: "lesson successfully deleted",
        }
    };
}