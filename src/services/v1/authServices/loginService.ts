import {UserModel} from "@models/User.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import type {InputUserLogin} from "@controllers/v1/index.js";
import {checkBannedUser, compareSecret} from "@src/lib/index.js";

// Chek

// 1. ban ✅
// 2. find user ✅
// 3. password ✅
// 4. refreshToken
// 5. accessToken
// 6. set Tokens
// 7. return response

export async function loginService(
    data: InputUserLogin
): Promise<ServiceResponse> {
    const {email, password} = data;
    const bannedUser = await checkBannedUser(
        email,
    );
    if (bannedUser) return bannedUser;

    const userExist = await UserModel.findOne({
        email
    });

    const invalidCredentials = {
        status: 401,
        data: {
            ok: false,
            message: "Invalid Credentials"
        }
    };
    if (!userExist) return invalidCredentials;

    const checkPassword: boolean = await compareSecret(
        password,
        userExist.password,
    );
    if (!checkPassword) return invalidCredentials;

    return {
        status: 200,
        data: {
            ok: true,
            message: "login successfully",
            data
        }
    };
}