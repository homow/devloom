import type {StringValue} from "ms";
import type {CookieOptions} from "express";
import {generateToken} from "@utils/crypto.js";

/** generate refresh token time with remember flag */
export function generateTokenTime(remember?: boolean): Date {
    return remember
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
        : new Date(Date.now() + 6 * 60 * 60 * 1000);     // 6h
}

interface BaseParms {
    payload: Record<string, unknown>;
}

interface TokenParamsRefresh extends BaseParms {
    tokenType: "refresh";
    remember?: boolean;
}

interface TokenParamsAccess extends BaseParms {
    tokenType: "access";
    remember?: never;
}

type TokenParams = TokenParamsRefresh | TokenParamsAccess;

/** create refresh or access token and options */
export function createTokenAndOptions(
    params: TokenParams
) {
    const {tokenType, payload} = params;

    const isRefresh: boolean = tokenType === "refresh";

    const remember: boolean | undefined = isRefresh ? params.remember : false;

    const expiresIn: StringValue | number = isRefresh
        ? remember
            ? "7d" : "6h"
        : "1h";

    const maxAge: number | undefined = isRefresh
        ? remember
            ? 1000 * 60 * 60 * 24 * 7
            : undefined
        : 1000 * 60 * 60;

    const token: string = generateToken({...payload, timestamp: Date.now()}, expiresIn);

    const options: CookieOptions = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: isRefresh,
        signed: isRefresh,
        sameSite: "lax",
        path: "/",
        maxAge,
    };

    return {token, options};
}