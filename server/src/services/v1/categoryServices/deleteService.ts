import type {ServiceResponse} from "@src/types/index.js";
import CategoryModel from "@models/Category.model.js";
import {getSafeCategory} from "@src/lib/index.js";

export async function deleteService(
    id: string
): Promise<ServiceResponse> {
    const categoryExist = await CategoryModel.findByIdAndDelete(id).lean();

    if (!categoryExist) return {
        status: 404,
        data: {
            ok: false,
            message: "Category not found.",
        }
    };

    return {
        status: 200,
        data: {
            ok: true,
            message: "Category deleted successfully.",
            category: categoryExist ? getSafeCategory(categoryExist) : undefined
        }
    };
}