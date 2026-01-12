import mongoose from "mongoose";
import {type CategoryInputCustom} from "./common.js";
import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";

export async function editService(
    id: string,
    data: CategoryInputCustom
): Promise<ServiceResponse> {
    const isValidID: boolean = mongoose.isValidObjectId(id);
    if (!isValidID) return {
        status: 403,
        data: {
            ok: false,
            message: "Invalid category ID. please check it",
            code: "INVALID_ID",
        }
    };

    const categoryExist = await CategoryModel.findById(id).lean();

    if (!categoryExist) return {
        status: 404,
        data: {
            ok: false,
            message: "category not found",
            code: "NOT_FOUND",
        }
    };

    const newData: CategoryInputCustom = {};

    if (typeof data.href !== "undefined") newData.href = data.href;
    if (typeof data.title !== "undefined") newData.title = data.title;

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
            message: "Successfully created",
            category: {
                id: updateCategory?.id.toString(),
                title: updateCategory?.title,
                href: updateCategory?.href,
                createdAt: updateCategory?.createdAt.toISOString(),
                updatedAt: updateCategory?.updatedAt.toISOString(),
            },
        }
    };
}