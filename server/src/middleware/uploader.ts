import {createMulter} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

const fileSizeError = {
    ok: false,
    message: "File size too large, must be less than 3MB",
    code: "LIMIT_FILE_SIZE"
};

interface UploaderOptions {
    pathDir: string;
    fileFieldName: string;
    otherDataFieldName: string;
}

export function singleUploader(
    {
        pathDir,
        fileFieldName,
        otherDataFieldName
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);

        multerUploader.single(fileFieldName)(req, res, (err) => {
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
            req.body = JSON.parse(req.body[otherDataFieldName]);
            req.body[fileFieldName] = file?.filename;
            return next();
        });
    };
}

export function multipleUploader(
    {
        pathDir,
        fileFieldName,
        otherDataFieldName
    }: UploaderOptions
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter(pathDir);

        multerUploader.array(fileFieldName)(req, res, (err) => {
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
            req.body = JSON.parse(req.body[otherDataFieldName]);

            if (Array.isArray(files) && files.length > 0) {
                req.body[fileFieldName] = files.map(f => f?.filename);
            }

            return next();
        });
    };
}