import {checkObjectID} from "@src/lib/index.js";
import type {NextFunction, Request, Response} from "express";

export function isValidParamId(key?: string) {
    return (
        req: Request<{
            id?: string;
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const id: string | undefined = req.params.id;

        if (!id) {
            return res.status(400).json({
                code: "MISSING_ID",
                message: "ID parameter is required",
            });
        }
        const invalidID = checkObjectID(id, key);
        if (invalidID) return res.status(invalidID.status).json(invalidID.data);

        return next();
    };
}