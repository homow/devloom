import {UserModel} from "@models/User.model.js";
import type {InputLogin} from "@validators/user.js";
import type {ServiceResponse} from "@src/types/index.js";
import {createRefreshTokensService} from "@services/v1/auth/index.js";
import {compareSecret, createTokenAndOptions, generateTokenTime, getSafeUser} from "@src/lib/index.js";

export async function loginService(
    data: InputLogin
): Promise<ServiceResponse> {
    const {email, password, remember} = data;

    const userExist = await UserModel.findOne({
        email
    });

    const invalidCredentials = {
        status: 401,
        data: {
            ok: false,
            message: "Invalid Credentials"
        }
    } as const;

    if (!userExist) return invalidCredentials;

    const checkPassword: boolean = await compareSecret(
        password,
        userExist.password,
    );
    if (!checkPassword) return invalidCredentials;

    const refreshToken = createTokenAndOptions({
        payload: {
            id: userExist._id,
            role: userExist.role,
            remember
        },
        tokenType: "refresh",
        remember,
    });
    const accessToken = createTokenAndOptions({
        payload: {
            id: userExist._id,
            role: userExist.role,
        },
        tokenType: "access"
    });

    const expiresAt: Date = generateTokenTime(remember);

    await createRefreshTokensService(
        userExist._id,
        refreshToken.token,
        expiresAt,
    );

    return {
        status: 200,
        data: {
            ok: true,
            message: "login successfully",
            user: getSafeUser(userExist),
            accessToken: accessToken.token
        },
        refreshToken
    };
}