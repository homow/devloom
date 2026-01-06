import type {CookieOptions} from "express";
import {generateToken} from "@utils/crypto.js";

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

export function createTokenAndOptions(params: TokenParams) {
    const {tokenType, payload} = params;

    const isRefresh: boolean = tokenType === "refresh";

    const remember: boolean | undefined =
        isRefresh
            ? params.remember
            : false;

    const expiresIn: "7d" | "24h" | "1h" = isRefresh
        ? remember
            ? "7d"
            : "24h"
        : "1h";

    const maxAge: number = isRefresh
        ? remember
            ? 1000 * 60 * 60 * 24 * 7
            : 1000 * 60 * 60 * 24
        : 1000 * 60 * 60;

    const token: string = generateToken(payload, expiresIn);

    const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        signed: isRefresh,
        path: "/",
        maxAge,
    };

    return {token, options};
}