import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {categoryProjectStage} from "@src/aggregations/index.js";

export async function getAllService(): Promise<ServiceResponse> {
    const categories = await CategoryModel.aggregate([categoryProjectStage]);

    return {
        status: 200,
        data: {
            message: "categories successfully found.",
            ok: true,
            categories,
        }
    };
}