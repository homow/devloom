import type {ServiceResponse} from "@src/types/index.js";
import {UserModel} from "@models/User.model.js";
import {createQueryPattern, getSafeUser} from "@src/lib/index.js";

export async function deleteUserService(
    id?: string,
    email?: string,
): Promise<ServiceResponse> {
    const pattern = createQueryPattern([
        {_id: id},
        {email},
    ], true);

    const userDeleted = await UserModel
        .findOneAndDelete(pattern);

    if (!userDeleted) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "user not found in database",
                code: "USER_NOT_FOUND"
            }
        };
    }

    return {
        status: 200,
        data: {
            ok: true,
            message: "user successfully deleted",
            user: getSafeUser(userDeleted)
        }
    };
}