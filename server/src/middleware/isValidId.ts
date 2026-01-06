import type {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";

export default function isValidId() {
    return (
        req: Request<{
            id?: string;
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const {id} = req.params;

        console.log(id);

        if (id) {
            const isValidId: boolean = mongoose
                .isValidObjectId(id);

            console.log(isValidId);

            if (!isValidId) {
                return res.status(401).json({
                    ok: false,
                    message: 'Invalid format ObjectId',
                    code: "INVALID_ID"
                });
            }

            req.params.id = id;
        }

        return next();
    };
}