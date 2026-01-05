import {type NextFunction, type Request, type Response} from "express";

export default function internalServerError(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    return res.status(500).json({
        ok: false,
        message: err.message || "Internal Server Error",
    });
};