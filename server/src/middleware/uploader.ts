import {createMulter} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

const fileSizeError = {
    ok: false,
    message: "File size too large, must be less than 3MB",
    code: "LIMIT_FILE_SIZE"
};

interface UploaderOptions {
    pathDir: string;
    fieldName: string;
}

export function singleUploader(
    {
        pathDir,
        fieldName
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);

        multerUploader.single(fieldName)(req, res, (err) => {
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

            return next();
        });
    };
}

export function multipleUploader(
    {
        pathDir,
        fieldName
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);

        multerUploader.array(fieldName)(req, res, (err) => {
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

            return next();
        });
    };
}