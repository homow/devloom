import mongoose from "mongoose";
import {hashSecret} from "@utils/crypto.js";
import {getSafeUser} from "@src/lib/index.js";
import {UserModel} from "@models/User.model.js";
import type {UpdateUserInput} from "@validators/user.js";
import type {ServiceResponse} from "@src/types/index.js";

export async function updateUserService(
    data: UpdateUserInput,
    userId?: string,
): Promise<ServiceResponse> {
    const isValidId: boolean = mongoose.isValidObjectId(userId);

    if (!isValidId) {
        return {
            status: 400,
            data: {
                ok: false,
                message: "Invalid user ID",
                code: "INVALID_USER_ID",
            }
        };
    }

    const {name, password} = data;

    let newData: UpdateUserInput = {};

    if (password !== undefined) {
        const hashedPassword: string = await hashSecret(password);
        newData = {password: hashedPassword};
    }

    if (name !== undefined) newData = {...newData, name: name};

    const user = await UserModel.findOneAndUpdate({_id: userId}, {$set: newData}, {new: true, runValidators: true});

    if (!user) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User not found",
                code: "USER_NOT_FOUND",
            },
        };
    }

    return {
        status: 200,
        data: {
            ok: true,
            message: "Successfully updated user",
            user: getSafeUser(user)
        }
    };
}