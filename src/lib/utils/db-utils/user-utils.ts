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