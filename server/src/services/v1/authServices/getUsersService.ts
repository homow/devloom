import {checkUserDB} from "@src/lib/index.js";
import {UserModel} from "@models/User.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {createAggregateStage, userProjectStage} from "@src/aggregations/index.js";

export async function getUsersService(
    id?: string,
    email?: string
): Promise<ServiceResponse> {
    if (id || email) {
        const user = await checkUserDB({id, email, useAnd: true});

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

    const userStage = createAggregateStage({stage: userProjectStage});
    const users = await UserModel.aggregate(userStage);

    return {
        status: 200,
        data: {
            ok: true,
            message: "users found",
            users
        }
    };
}