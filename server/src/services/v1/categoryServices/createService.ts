import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";

interface CustomError extends Error {
    code: number;
}

export async function createService(
    data: CategoryInput
): Promise<ServiceResponse> {
    try {
        const newCategory = await CategoryModel.create({
            title: data.title,
            href: data.href,
        });

        return {
            status: 201,
            data: {
                ok: true,
                message: "Successfully created",
                category: {
                    id: newCategory.id.toString(),
                    title: newCategory.title,
                    href: newCategory.href,
                    createdAt: newCategory.createdAt.toISOString(),
                    updatedAt: newCategory.updatedAt.toISOString(),
                },
            }
        };
    } catch (e) {
        if ((e as CustomError).code === 11000) {
            return {
                status: 409,
                data: {
                    ok: false,
                    message: "Category already exists",
                    code: "CATEGORY_EXIST",
                }
            };
        } else {
            throw e;
        }
    }
}