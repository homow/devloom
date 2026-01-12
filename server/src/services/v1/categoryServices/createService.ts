import {getSafeCategory} from "@src/lib/index.js";
import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";
import {checkCategoryConflict} from "@services/v1/categoryServices/common.js";

export async function createService(
    data: CategoryInput
): Promise<ServiceResponse> {
    const categoryExist = await checkCategoryConflict(data);

    if (categoryExist) return categoryExist;

    const newCategory = await CategoryModel.create({
        title: data.title,
        href: data.href,
    });

    return {
        status: 201,
        data: {
            ok: true,
            message: "Successfully created",
            category: getSafeCategory(newCategory),
        }
    };
}