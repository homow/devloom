import type {ServiceResponse} from "@src/types/index.js";
import {checkUserDB} from "@src/lib/index.js";
import {UserModel} from "@models/User.model.js";
import {userAggregate} from "@src/aggregations/user.js";

export async function getUsersService(
    id?: string,
): Promise<ServiceResponse> {
    if (id) {
        const user = await checkUserDB({id});

        if (!user) {
            return {
                status: 404,
                data: {
                    ok: false,
                    message: "user not found in database",
                    code: "USER_NOT_FOUND",
                }
            };
        }

        return {
            status: 200,
            data: {
                ok: true,
                message: "user found",
                user
            }
        };
    }

    const users = await UserModel.aggregate(userAggregate());

    return {
        status: 200,
        data: {
            ok: true,
            message: "users found",
            users
        }
    };
}