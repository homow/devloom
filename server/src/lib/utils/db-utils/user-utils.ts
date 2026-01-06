import {UserModel} from "@src/models/User.model.js";
import {userAggregate} from "@src/aggregations/user.js";

interface CheckUserDBParams {
    id?: string;
    email?: string;
    useAnd?: boolean;
}

export async function checkUserDB(
    {
        email,
        id,
        useAnd = false,
    }: CheckUserDBParams
) {
    if (!email && !id) return null;

    const user = await UserModel
        .aggregate(userAggregate({id, email}, useAnd));

    return user[0] || null;
}

import {BanUserModel} from "@models/BanUser.model.js";

export async function checkBannedUser(email: string) {
    const userBanned = await BanUserModel
        .findOne({email})
        .lean();

    if (!userBanned) return null;

    return {
        status: 403,
        data: {
            ok: false,
            message: "This user is banned. Please contact support if you think this is a mistake.",
            email
        },
    };
}