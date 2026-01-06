import {Types} from "mongoose";
import type {BaseDB} from "./common.js";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface UserDB extends BaseDB {
    name?: string;
    email: string;
    role: UserRole;
    password: string;
}

export interface RefreshToken extends BaseDB {
    token: string;
    user: Types.ObjectId;
    isRevoked: boolean;
    expiresAt: Date;
}