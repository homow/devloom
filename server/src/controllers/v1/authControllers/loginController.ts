import type {Request, Response} from "express";
import {loginService} from "@services/v1/index.js";
import type {InputLogin} from "@validators/user.js";
import {createTokenAndOptions} from "@utils/tokens.js";

export async function loginController(
    req: Request<{}, {}, InputLogin>,
    res: Response
) {
    const result = await loginService(req.body);

    if (result.data.ok) {
        const refreshToken = (result.refreshToken as ReturnType<typeof createTokenAndOptions>);
        res.cookie("refreshToken",
            refreshToken.token,
            refreshToken.options
        );
    }

    return res.status(result.status).send(result.data);
}