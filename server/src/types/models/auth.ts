import {Types} from "mongoose";
import type {BaseDB} from "./common.js";

export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
}

export const RolePriority = {
    [UserRole.SUPER_ADMIN]: 3,
    [UserRole.ADMIN]: 2,
    [UserRole.USER]: 1,
} as const;

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