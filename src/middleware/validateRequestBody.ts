import z from "zod";
import type {Request, Response, NextFunction} from "express";

export function formatZodError(error: z.ZodError) {
    return error?.issues?.map(i => ({
        fields: i.path.join(", "),
        message: i.message,
    }));
}

export function validateBody<T extends z.ZodTypeAny>(schema: T) {
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