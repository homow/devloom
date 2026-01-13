import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {categoryProjectStage} from "@src/aggregations/index.js";
import {getSafeCategory} from "@src/lib/index.js";

export async function getService(
    id?: string,
): Promise<ServiceResponse> {
    if (id) {
        const category = await CategoryModel.findById(id);

        if (!category) {
            return {
                status: 404,
                data: {
                    ok: false,
                    message: "Category not found.",
                }
            };
        }

        return {
            status: 200,
            data: {
                ok: true,
                message: "Category successfully found.",
                category: getSafeCategory(category)
            }
        };
    }

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