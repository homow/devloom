import {UserModel} from "@models/User.model.js";
import type {InputLogin} from "@validators/user.js";
import type {ServiceResponse} from "@src/types/index.js";
import {compareSecret, createTokenAndOptions, getSafeUser, hashSecret} from "@src/lib/index.js";
import {createRefreshTokenService} from "@services/v1/index.js";

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

    const hashedToken: string = await hashSecret(refreshToken.token);

    const expiresAt: Date = remember
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
        : new Date(Date.now() + 24 * 60 * 60 * 1000);    // 1d

    await createRefreshTokenService(
        userExist._id,
        hashedToken,
        expiresAt
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