import {UserModel} from "@models/User.model.js";
import {createQueryPattern, getSafeUser} from "@src/lib/index.js";
import {UserRole, RolePriority, type ServiceResponse} from "@src/types/index.js";

interface Params {
    id?: string;
    email?: string;
    role: UserRole;
}

export async function deleteUserService(
    {
        id,
        role,
        email,
    }: Params
): Promise<ServiceResponse> {
    const pattern = createQueryPattern([{_id: id}, {email}], true);

    const userExist = await UserModel.findOne(pattern);

    if (!userExist) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "user not found in database",
                code: "USER_NOT_FOUND"
            }
        };
    }

    const userExistRole = RolePriority[userExist.role];
    const isAllowedToDelete: boolean = userExistRole < RolePriority[role];

    if (isAllowedToDelete) {
        const userDeleted = await UserModel.findOneAndDelete(pattern);

        return {
            status: 200,
            data: {
                ok: true,
                message: "user successfully deleted",
                user: userDeleted && getSafeUser(userDeleted)
            }
        };
    } else {
        return {
            status: 403,
            data: {
                ok: false,
                message: "you cannot ban a user with equal or higher role",
                code: "ROLE_NOT_ALLOWED"
            }
        };
    }
}