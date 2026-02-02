import CourseModel from "@models/Course.model.js";
import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {courseProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function getCoursesByCategoryService(
    href: string,
): Promise<ServiceResponse> {
    const category = await CategoryModel.findOne({
        href
    }).lean();

    if (!category) return {
        status: 404,
        data: {
            ok: false,
            message: "category not found",
            code: "CATEGORY_NOT_FOUND"
        }
    };

    const pipelineStage = createPipelineStage({
        filter: [{category: category._id}],
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