import type {Response} from "express";
import {generateToken} from "@utils/auth.js";

export function createRefreshToken(
    payload: Record<string, unknown>,
    res: Response
) {
    const token: string = generateToken({
        ...payload,
    }, payload.remember ? "7d" : "24h");

    res.setHeader("refreshToken", token);
}