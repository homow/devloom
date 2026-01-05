import {type NextFunction, type Request, type Response} from "express";

interface ErrorResponse extends Error {
    status: number;
}

export default function internalServerError(
    err: ErrorResponse,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    return res.status(err.status || 500).json({
        ok: false,
        message: err.message || "Internal Server Error",
    });
};