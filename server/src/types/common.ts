import type {Request} from "express";
import type {JwtPayload} from "jsonwebtoken";
import {UserRole} from "@src/types/models/index.js";

interface ServiceResponseData {
    [key: string]: unknown;

    ok: boolean;
    message: string;
}

export interface ServiceResponse {
    [key: string]: unknown;

    status: number;
    data: ServiceResponseData;
}

export interface AuthPayload extends JwtPayload {
    id: string;
    role: UserRole;
    remember?: boolean;
}

export interface AuthRequest<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = {}
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    userPayload?: AuthPayload;
}