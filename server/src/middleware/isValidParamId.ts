import mongoose from "mongoose";
import type {NextFunction, Request, Response} from "express";

export default function isValidParamId(
    req: Request<{
        id?: string;
    }>,
    res: Response,
    next: NextFunction
) {
    const id: string | undefined = req.params.id;

    if (!id) {
        return res.status(400).json({
            code: "MISSING_ID",
            message: "ID parameter is required",
        });
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            ok: false,
            message: 'Invalid format ObjectId',
            code: "INVALID_ID"
        });
    }
    return next();
};