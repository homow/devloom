import {checkObjectID} from "@src/lib/index.js";
import CategoryModel from "@models/Category.model.js";
import type {CategoryInput} from "@validators/category.js";
import {categoryProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function checkCategoryConflict(data: CategoryInput, id?: string) {
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    const stage = createPipelineStage({
        stage: categoryProjectStage,
        filter: [{title: data.title}, {href: data.href}, {_id: id}]
    });
    const [categoryExist] = await CategoryModel.aggregate(stage);

    if (categoryExist) {
        return {
            status: 409,
            data: {
                message: "",
                ok: false,
                category: categoryExist
            }
        };
    }

    return null;
}