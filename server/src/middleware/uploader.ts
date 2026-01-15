import z from "zod";
import type {NextFunction, Request, Response} from "express";
import {createMulter, formatZodError} from "@src/lib/index.js";

const fileSizeError = {
    ok: false,
    message: "File size too large, must be less than 3MB",
    code: "LIMIT_FILE_SIZE"
};

function checkBody(
    data: unknown,
    schema: z.ZodTypeAny,
    req: Request,
    res: Response
) {
    const result = schema.safeParse(data);

    if (!result.success) return res.status(422).json({
        status: 422,
        data: {
            ok: false,
            errors: formatZodError(result.error),
            message: "body is invalid"
        }
    });

    return req.body = result.data;
}

interface BaseUploaderOptions {
    pathDir: string;
    fileFieldName: string;
}

interface UploaderOptionsFile extends BaseUploaderOptions {
    otherDataFieldName?: never;
    schema?: never;
}

interface UploadOptionsFileWithBody extends BaseUploaderOptions {
    schema?: z.ZodTypeAny;
    otherDataFieldName?: string;
}

type UploaderOptions = | UploaderOptionsFile | UploadOptionsFileWithBody;

export function singleUploader(
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
            if (otherDataFieldName && schema) {
                checkBody(JSON.parse(req.body[otherDataFieldName]), schema, req, res);
            }

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

export function multipleUploader(
    {
        pathDir,
        fileFieldName,
        otherDataFieldName,
        schema
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);

        multerUploader.array(fileFieldName)(req, res, (err) => {
            if (otherDataFieldName !== undefined && schema) {
                checkBody(JSON.parse(req.body[otherDataFieldName]), schema, req, res);
            }

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

            const files = req.files;

            if (Array.isArray(files) && files.length > 0) {
                req.body[fileFieldName] = files.map(f => f?.filename);
            }

            return next();
        });
    };
}