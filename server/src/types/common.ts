import type {Request} from "express";
import type {JwtPayload} from "jsonwebtoken";
import {UserRole} from "@src/types/models/index.js";

// an equal response data for all services
interface ServiceResponseData {
    [key: string]: unknown;

    ok: boolean;
    message: string;
}

// an equal response for all services
export interface ServiceResponse {
    [key: string]: unknown;

    status: number;
    data: ServiceResponseData;
}

// create a type for user-payload from jwt
export interface AuthPayload extends JwtPayload {
    id: string;
    role: UserRole;
    remember?: boolean;
}

// extend Request and return a type for protected routes
export interface AuthRequest<
    P = {},
    ResBody = {},
    ReqBody = {},
    ReqQuery = {}
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    userPayload?: AuthPayload;
}