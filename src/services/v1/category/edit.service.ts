import {getSafeCategory} from "@src/lib/index.js";
import CategoryModel from "@models/Category.model.js";
import type {EditCategoryInput} from "@validators/category.js";
import type {CustomError, ServiceResponse} from "@src/types/index.js";

export async function editService(
    id: string,
    data: EditCategoryInput
): Promise<ServiceResponse> {
    try {
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
                category: getSafeCategory(categoryExist)
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
    } catch (e) {
        const customError = e as CustomError;

        if (customError.errorResponse.code === 11000) {
            const errors = [];

            if (customError.errorResponse.keyPattern.href) {
                errors.push({
                    field: "href",
                    message: "href already exists in database",
                });
            }

            if (customError.errorResponse.keyPattern.title) {
                errors.push({
                    field: "title",
                    message: "title already exists in database",
                });
            }

            return {
                status: 409,
                data: {
                    ok: false,
                    message: "data already exists in database",
                    errors
                }
            };
        }

        return {
            status: 500,
            data: {
                ok: false,
                message: (e as Error).message || "Something went wrong, please try again later.",
            }
        };
    }
}