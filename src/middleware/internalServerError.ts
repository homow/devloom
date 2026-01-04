import {type NextFunction, type Request, type Response} from "express";

export default function internalServerError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

};