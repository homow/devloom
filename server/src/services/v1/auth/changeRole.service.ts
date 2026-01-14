import {getSafeUser} from "@src/lib/index.js";
import {UserModel} from "@models/User.model.js";
import {type AuthPayload, RolePriority, type ServiceResponse, UserRole} from "@src/types/index.js";

interface Params {
    userPayload: AuthPayload;
    targetID: string;
    newRole: UserRole.ADMIN | UserRole.USER;
}

export async function changeRoleService(
    {
        targetID,
        newRole,
        userPayload
    }: Params
): Promise<ServiceResponse> {
    if (targetID === userPayload.id) {
        return {
            status: 403,
            data: {
                ok: false,
                code: "CANNOT_CHANGE_OWN_ROLE",
                message: "You are not allowed to change your own role."
            }
        };
    }

    const userTarget = await UserModel.findById(targetID).lean();

    if (!userTarget) {
        return {
            status: 404,
            data: {
                ok: false,
                message: "User does not exist",
                code: "USER_NOT_FOUND"
            }
        };
    }

    const isAllowed: boolean = RolePriority[userTarget.role] < RolePriority[userPayload.role];

    if (!isAllowed) {
        return {
            status: 403,
            data: {
                ok: false,
                code: "ACCESS_DENIED",
                message: "You are not allowed to perform this action."
            }
        };
    }

    if (newRole === userTarget.role) {
        return {
            status: 400,
            data: {
                ok: false,
                code: "ROLE_ALREADY_ASSIGNED",
                message: `The user already has the role ${newRole}`,
                userTarget: getSafeUser(userTarget)
            }
        };
    }

    const updateUser = await UserModel.findByIdAndUpdate(targetID, {$set: {role: newRole}}, {new: true}).lean();

    return {
        status: 200,
        data: {
            ok: true,
            message: "User role updated successfully",
            userTarget: updateUser && getSafeUser(updateUser)
        }
    };
}