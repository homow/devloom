import type {NextFunction, Request, Response} from "express";

export function validateGlobalBody(
    err: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            ok: false,
            message: "Invalid JSON",
        });
    }
    return next(err);
}