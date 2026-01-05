import z from "zod";
import {formatZodError} from "@src/lib/index.js";
import type {Request, Response, NextFunction} from "express";

export function validateRequestBody<T extends z.ZodTypeAny>(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(422).json({
                ok: false,
                errors: formatZodError(result.error),
            });
        }
        req.body = result.data;
        return next();
    };
}