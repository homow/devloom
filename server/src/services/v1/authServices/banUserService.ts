import {checkUserDB} from "@src/lib/index.js";
import {BanUserModel} from "@models/BanUser.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {revokeAllUserTokens} from "@services/v1/index.js";

export async function banUserService(
    email: string
): Promise<ServiceResponse> {
    const banUser = await BanUserModel
        .create({email});

    const userExist = await checkUserDB({
        email
    });

    if (userExist) await revokeAllUserTokens(userExist.id);

    return {
        status: 200,
        data: {
            ok: true,
            message: "user banned successfully",
            email: banUser.email
        }
    };
}