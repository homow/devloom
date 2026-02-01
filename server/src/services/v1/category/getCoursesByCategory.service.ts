import CourseModel from "@models/Course.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {courseProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function getCoursesByCategoryService(
    href: string,
): Promise<ServiceResponse> {
    const pipelineStage = createPipelineStage({
        filter: [{category: href}],
        stage: courseProjectStage
    });
    const courses = await CourseModel.aggregate(pipelineStage);

    return {
        status: 200,
        data: {
            ok: true,
            message: `courses get successfully in ${href} category.`,
            courses
        }
    };
}