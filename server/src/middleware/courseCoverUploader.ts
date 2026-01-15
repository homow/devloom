import z from "zod";
import type {NextFunction, Request, Response} from "express";
import {createMulter, formatZodError} from "@src/lib/index.js";

const fileSizeError = {
    ok: false,
    message: "File size too large, must be less than 3MB",
    code: "LIMIT_FILE_SIZE"
};

interface UploaderOptions {
    pathDir: string;
    fileFieldName: string;
    schema: z.ZodTypeAny;
    otherDataFieldName: string;
}

export function courseCoverUploader(
    {
        pathDir,
        fileFieldName,
        otherDataFieldName,
        schema,
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);
        multerUploader.single(fileFieldName)(req, res, (err) => {
            const body = JSON.parse(req.body[otherDataFieldName]);
            const result = schema.safeParse(body);

            if (!result.success) return res.status(422).json({
                status: 422,
                data: {
                    ok: false,
                    errors: formatZodError(result.error),
                    message: "body is invalid"
                }
            });

            req.body = result.data;

            if (err) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json(fileSizeError);
                }
                return res.status(400).json({
                    ok: false,
                    message: err?.message,
                    code: err?.code,
                });
            }
            const file = req.file;
            req.body[fileFieldName] = file?.filename;
            return next();
        });
    };
}