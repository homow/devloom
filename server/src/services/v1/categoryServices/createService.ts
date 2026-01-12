import CategoryModel from "@models/Category.model.js";
import type {CategoryDB, ServiceResponse} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";
import {categoryProjectStage, createAggregateStage} from "@src/aggregations/index.js";

export async function createService(
    data: CategoryInput
): Promise<ServiceResponse> {
    const stage = createAggregateStage({
        stage: categoryProjectStage,
        filter: [{title: data.title}, {href: data.href}]
    });
    const [categoryExist] = await CategoryModel.aggregate(stage);

    if (categoryExist) {
        const ctg =  categoryExist as CategoryDB;

        const messages = [];

        if (data.href === ctg.href) messages.push("href");
        if (data.title === ctg.title) messages.push("title");

        const msg = `${messages[0] !== undefined ? messages[0] : ""} ${messages.length > 1 ? "and" : ""} ${messages[1] !== undefined ? messages[1] : ""}`;

        return {
            status: 409,
            data: {
                message: `Category Already exist: (${msg.trim()})`,
                ok: false,
                category: ctg
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