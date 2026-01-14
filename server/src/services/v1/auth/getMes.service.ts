import mongoose from "mongoose";
import {checkUserDB} from "@src/lib/index.js";
import type {AuthPayload, ServiceResponse} from "@src/types/index.js";

export async function getMesService(
    userPayload: AuthPayload
): Promise<ServiceResponse> {
    const isValidID: boolean = mongoose.isValidObjectId(userPayload.id);

    if (!isValidID) {
        return {
            status: 400,
            data: {
                ok: false,
                message: "invalid user id",
                code: "INVALID_ID",
            }
        };
    }

    const userExist = await checkUserDB({id: userPayload.id});

    if (!userExist) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "user does not exists",
                code: "USER_NOT_FOUND",
            }
        };
    }
    return {
        status: 200,
        data: {
            ok: true,
            message: "user successfully found",
            user: userExist
        }
    };
}