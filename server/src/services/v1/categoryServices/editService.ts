import {getSafeCategory} from "@src/lib/index.js";
import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import type {EditCategoryInput} from "@validators/category.js";

export async function editService(
    id: string,
    data: EditCategoryInput
): Promise<ServiceResponse> {
    const categoryExist = await CategoryModel.findById(id).lean();

    if (!categoryExist) return {
        status: 404,
        data: {
            ok: false,
            message: "category not found",
            code: "NOT_FOUND",
        }
    };

    const newData: EditCategoryInput = {};

    if (data.href) newData.href = data.href;
    if (data.title) newData.title = data.title;

    if (data.href === categoryExist.href || data.title === categoryExist.title) return {
        status: 409,
        data: {
            ok: false,
            message: "new data must be different with this category data",
            code: "CONFLICT_DATA",
        }
    };

    const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
        $set: newData
    }, {new: true});

    return {
        status: 200,
        data: {
            ok: true,
            message: "Successfully updated category",
            category: updateCategory && getSafeCategory(updateCategory),
        }
    };
}