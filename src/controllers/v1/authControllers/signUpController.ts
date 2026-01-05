import type {Request, Response} from "express";

export async function signUpController(
    _req: Request,
    res: Response
) {
    return res.status(200).json({
        ok: true,
        message: "Sign Up successfully"
    });
}