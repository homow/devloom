import {multerUploader} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

export function uploader(
    req: Request,
    res: Response,
    next: NextFunction
) {
    multerUploader.single("file")(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    ok: false,
                    message: "File size too large, must be less than 3MB",
                    code: "LIMIT_FILE_SIZE"
                });
            }
            return res.status(400).json({
                ok: false,
                message: err.message,
            });
        }

        return next();
    });
}