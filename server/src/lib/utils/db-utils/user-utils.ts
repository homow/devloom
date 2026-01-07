import mongoose from "mongoose";
import {UserModel} from "@src/models/User.model.js";
import {BanUserModel} from "@models/BanUser.model.js";
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

    const aggregate = userAggregate([
        {
            _id: id && new mongoose.Types.ObjectId(id)
        },
        {email}
    ], useAnd);

    const user = await UserModel
        .aggregate(aggregate);
    return user[0] || null;
}

export async function checkBannedUser(email: string, message?: string) {
    const userBanned = await BanUserModel.findOne({email}).lean();

    if (!userBanned) return null;

    return {
        status: 403,
        data: {
            ok: false,
            message: message ||
                "This user is banned. Please contact support if you think this is a mistake.",
            email,
            code: "BANNED_EMAIL"
        },
    };
}