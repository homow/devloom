import mongoose from "mongoose";
import CategoryModel from "@models/Category.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {checkCategoryConflict, type CategoryInputCustom} from "./common.js";

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

    const categoryExist = await checkCategoryConflict(data);

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

    if (data.href === categoryExist.)

    const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
        $set: newData
    }, {new: true});


}