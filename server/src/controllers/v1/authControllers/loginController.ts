import {createToken} from "@utils/tokens.js";
import type {Request, Response} from "express";
import type {UserDB} from "@src/types/index.js";
import {loginService} from "@services/v1/index.js";
import type {InputLogin} from "@validators/user.js";

export async function loginController(
    req: Request<{}, {}, InputLogin>,
    res: Response
) {
    const result = await loginService(req.body);

    if (result.data.ok) {
        const {remember} = req.body;
        console.log(remember);
        const refreshToken = createToken({
            payload: {
                id: (result.userDB as UserDB)._id,
                remember: remember ?? false
            },
            tokenType: "refresh",
            remember: remember ?? false,
        });
        const accessToken = createToken({
            payload: {
                id: (result.userDB as UserDB)._id
            },
            tokenType: "access"
        });

        res.cookie("refreshToken",
            refreshToken.token,
            refreshToken.options
        );
        res.cookie("accessToken",
            accessToken.token,
            accessToken.options
        );
    }

    return res.status(result.status).send(result.data);
}