import {UserModel} from "@src/models/User.model.js";
import {BanUserModel} from "@models/BanUser.model.js";
import {createPipelineStage, userProjectStage} from "@src/aggregations/index.js";

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

    const aggregate = createPipelineStage({filter: [
        {_id: id},
        {email}
    ], useAnd, stage: userProjectStage});

    const user = await UserModel.aggregate(aggregate);
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
                "Access denied: Your account is banned. Contact support for assistance.",
            email,
            code: "BANNED_EMAIL"
        },
    };
}