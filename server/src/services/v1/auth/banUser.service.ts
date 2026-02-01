import {UserModel} from "@models/User.model.js";
import {BanUserModel} from "@models/BanUser.model.js";
import {revokeAllUserTokens} from "@services/v1/auth/index.js";
import {type AuthRouteParams, type ServiceResponse} from "@src/types/index.js";
import {createQueryPattern, getSafeUser, isAllowedToAction} from "@src/lib/index.js";

export async function banUserService(
    {
        id,
        role,
        email
    }: AuthRouteParams
): Promise<ServiceResponse> {
    const pattern = createQueryPattern([{_id: id}, {email}], true);

    const userExist = await UserModel.findOne(pattern);

    if (userExist) {
        const isAllowedToBan: boolean = isAllowedToAction({
            actionRole: role,
            targetRole: userExist.role,
            roleComparison: "higher"
        });

        if (isAllowedToBan) {
            await revokeAllUserTokens(userExist.id);
            await BanUserModel.create({email});

            return {
                status: 200,
                data: {
                    ok: true,
                    message: "user banned successfully",
                    user: getSafeUser(userExist),
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
    } else {
        await BanUserModel.create({email});

        return {
            status: 200,
            data: {
                ok: true,
                message: "user banned successfully",
                user: "user not exist in database",
            }
        };
    }
}