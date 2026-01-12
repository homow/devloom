import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";
import {categoryProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function createService(
    data: CategoryInput
): Promise<ServiceResponse> {
    const stage = createPipelineStage({
        stage: categoryProjectStage,
        filter: [{title: data.title}, {href: data.href}]
    });
    const [categoryExist] = await CategoryModel.aggregate(stage);

    if (categoryExist) {
        const messages = [];

        if (data.href === categoryExist.href) messages.push("href");
        if (data.title === categoryExist.title) messages.push("title");

        const msg = `${messages[0] !== undefined ? messages[0] : ""} ${messages.length > 1 ? "and" : ""} ${messages[1] !== undefined ? messages[1] : ""}`;

        return {
            status: 409,
            data: {
                message: `Category Already exist: (${msg.trim()})`,
                ok: false,
                category: categoryExist
            }
        };
    }

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
}