import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {categoryProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export type CategoryInputCustom = {
    title?: string;
    href?: string;
};

export async function checkCategoryConflict(data: CategoryInputCustom): Promise<ServiceResponse | null> {
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

    return null;
}