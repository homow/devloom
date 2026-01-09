import type {AuthRequest} from "@src/types/index.js";
import type {Response} from "express";

export async function logoutController(
    req: AuthRequest,
    res: Response
) {
    console.log("req.cookies: ", req.cookies);
    console.log("req.signedCookies: ", req.signedCookies);
    return res.status(200).json({
        status: "success",
    });
}