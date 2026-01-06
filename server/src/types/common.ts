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

export interface AuthRequest extends Request {
    userPayload?: JwtPayload & {
        id: string;
        role: UserRole;
    };
}